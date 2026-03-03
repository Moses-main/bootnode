import Account from '../models/account.model.js';
import Transaction from '../models/transaction.model.js';
import Card from '../models/card.model.js';

/**
 * Account Service
 */
export const accountService = {
  /**
   * Get all accounts for a user
   */
  async getUserAccounts(userId) {
    return Account.find({ user: userId }).sort({ createdAt: -1 });
  },

  /**
   * Get account by ID
   */
  async getAccountById(id, userId) {
    return Account.findOne({ _id: id, user: userId });
  },

  /**
   * Create new account
   */
  async createAccount(userId, data) {
    const account = await Account.create({
      ...data,
      user: userId
    });
    return account;
  },

  /**
   * Update account
   */
  async updateAccount(id, userId, data) {
    return Account.findOneAndUpdate(
      { _id: id, user: userId },
      data,
      { new: true }
    );
  },

  /**
   * Freeze account
   */
  async freezeAccount(id, userId) {
    return Account.findOneAndUpdate(
      { _id: id, user: userId },
      { status: 'frozen' },
      { new: true }
    );
  },

  /**
   * Get account balance
   */
  async getBalance(id, userId) {
    const account = await Account.findOne({ _id: id, user: userId });
    return account ? { balance: account.balance, availableBalance: account.availableBalance } : null;
  }
};

/**
 * Transaction Service
 */
export const transactionService = {
  /**
   * Get transactions for an account
   */
  async getTransactions(accountId, userId, { page = 1, limit = 20, type, status }) {
    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) return null;

    const query = { account: accountId };
    if (type) query.type = type;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
      Transaction.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Transaction.countDocuments(query)
    ]);

    return {
      transactions,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
  },

  /**
   * Get transaction by ID
   */
  async getTransactionById(id, userId) {
    return Transaction.findOne({ _id: id, user: userId });
  },

  /**
   * Deposit money
   */
  async deposit(accountId, userId, amount, description) {
    const account = await Account.findOne({ _id: accountId, user: userId, status: 'active' });
    if (!account) throw new Error('Account not found or inactive');

    const balanceBefore = account.balance;
    account.balance += amount;
    account.availableBalance += amount;
    await account.save();

    const transaction = await Transaction.create({
      user: userId,
      account: account._id,
      type: 'deposit',
      amount,
      balanceBefore,
      balanceAfter: account.balance,
      status: 'completed',
      description,
      processedAt: new Date(),
      completedAt: new Date()
    });

    return { transaction, newBalance: account.balance };
  },

  /**
   * Withdraw money
   */
  async withdraw(accountId, userId, amount, description) {
    const account = await Account.findOne({ _id: accountId, user: userId, status: 'active' });
    if (!account) throw new Error('Account not found or inactive');
    if (account.availableBalance < amount) throw new Error('Insufficient funds');
    if (amount > account.dailyLimit) throw new Error('Amount exceeds daily limit');

    const balanceBefore = account.balance;
    account.balance -= amount;
    account.availableBalance -= amount;
    await account.save();

    const transaction = await Transaction.create({
      user: userId,
      account: account._id,
      type: 'withdrawal',
      amount,
      balanceBefore,
      balanceAfter: account.balance,
      status: 'completed',
      description,
      processedAt: new Date(),
      completedAt: new Date()
    });

    return { transaction, newBalance: account.balance };
  },

  /**
   * Transfer money between accounts
   */
  async transfer(fromAccountId, toAccountNumber, userId, amount, description) {
    const fromAccount = await Account.findOne({ _id: fromAccountId, user: userId, status: 'active' });
    if (!fromAccount) throw new Error('Source account not found or inactive');
    if (fromAccount.availableBalance < amount) throw new Error('Insufficient funds');

    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
    if (!toAccount) throw new Error('Destination account not found');
    if (fromAccount._id.equals(toAccount._id)) throw new Error('Cannot transfer to same account');

    // Deduct from source
    const fromBalanceBefore = fromAccount.balance;
    fromAccount.balance -= amount;
    fromAccount.availableBalance -= amount;
    await fromAccount.save();

    // Add to destination
    const toBalanceBefore = toAccount.balance;
    toAccount.balance += amount;
    toAccount.availableBalance += amount;
    await toAccount.save();

    // Create transactions
    const debitTx = await Transaction.create({
      user: userId,
      account: fromAccount._id,
      type: 'transfer',
      amount,
      balanceBefore: fromBalanceBefore,
      balanceAfter: fromAccount.balance,
      status: 'completed',
      description: `Transfer to ${toAccountNumber}`,
      recipientAccount: toAccountNumber,
      recipientUser: toAccount.user,
      processedAt: new Date(),
      completedAt: new Date()
    });

    await Transaction.create({
      user: toAccount.user,
      account: toAccount._id,
      type: 'transfer',
      amount,
      balanceBefore: toBalanceBefore,
      balanceAfter: toAccount.balance,
      status: 'completed',
      description: `Transfer from ${fromAccount.accountNumber}`,
      recipientAccount: fromAccount.accountNumber,
      recipientUser: userId,
      processedAt: new Date(),
      completedAt: new Date()
    });

    return { transaction: debitTx, newBalance: fromAccount.balance };
  }
};

/**
 * Card Service
 */
export const cardService = {
  /**
   * Get user's cards
   */
  async getUserCards(userId) {
    return Card.find({ user: userId }).populate('account', 'accountNumber type');
  },

  /**
   * Get card by ID
   */
  async getCardById(id, userId) {
    return Card.findOne({ _id: id, user: userId });
  },

  /**
   * Create new card
   */
  async createCard(userId, accountId, data) {
    const account = await Account.findOne({ _id: accountId, user: userId, status: 'active' });
    if (!account) throw new Error('Account not found or inactive');

    const card = await Card.create({
      ...data,
      user: userId,
      account: accountId
    });
    return card;
  },

  /**
   * Block card
   */
  async blockCard(id, userId) {
    return Card.findOneAndUpdate(
      { _id: id, user: userId },
      { status: 'blocked', blockedAt: new Date() },
      { new: true }
    );
  },

  /**
   * Set card PIN
   */
  async setPin(id, userId, pin) {
    return Card.findOneAndUpdate(
      { _id: id, user: userId, status: 'active' },
      { pin },
      { new: true }
    );
  }
};
