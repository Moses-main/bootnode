# Installation

## Prerequisites

Before installing bootnode, ensure you have the following:

- **Node.js** 14.x or later
- **npm** 6.x or later
- **MongoDB** (local or cloud instance like MongoDB Atlas)

## Installing Node.js

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org) or use a version manager:

```bash
# Using nvm (recommended)
nvm install node
nvm use node

# Or using brew (macOS)
brew install node
```

## Installing MongoDB

### Local Installation

```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt update
sudo apt install mongodb
sudo systemctl start mongod
```

### Cloud Instance

Alternatively, create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installing bootnode

No need to install globally! Use `npx` to run directly:

```bash
npx bootnode --version
```

This will show the current version of bootnode.

## Updating bootnode

To get the latest version:

```bash
npx bootnode@latest --help
```

## Next Steps

- [Quick Start](quick-start.md) - Create your first project
- [Project Structure](project-structure.md) - Understand the generated code
