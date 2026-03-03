# Installation

## Prerequisites

Before using bootnode, ensure you have the following installed:

### Node.js (v18+)

```bash
# Check if Node.js is installed
node --version

# If not installed, use nvm (recommended)
nvm install 20
nvm use 20

# Or download from nodejs.org
# https://nodejs.org
```

### MongoDB

You need a MongoDB instance. Choose one:

**Option 1: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string

## Quick Install

No! Use ` installation needednpx` to run directly:

```bash
npx bootnode --help
```

This downloads and runs the CLI without global installation.

## Global Installation (Optional)

If you prefer having bootnode available globally:

```bash
npm install -g bootnode
```

Then use:
```bash
bootnode my-project
```

## Updating bootnode

To get the latest version:

```bash
npx bootnode@latest my-project
```

## System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| Node.js | 18.x | 20.x+ |
| npm | 8.x | 10.x |
| MongoDB | 4.4+ | 6.0+ |
| RAM | 512MB | 1GB+ |

## Next Steps

- [Quick Start Guide](../getting-started/quick-start.md) - Create your first project
- [Project Structure](../getting-started/project-structure.md) - Understand the generated code
