#!/usr/bin/env node
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available templates
const TEMPLATES = {
  blank: {
    name: "Blank",
    description: "Minimal Express.js server with basic setup",
    icon: "📄"
  },
  api: {
    name: "API Server",
    description: "REST API with authentication, CRUD, and validation",
    icon: "🔌"
  },
  blog: {
    name: "Blog API",
    description: "Blog with posts, categories, comments, and authentication",
    icon: "📝"
  },
  cms: {
    name: "CMS",
    description: "Content Management System with articles, media, and users",
    icon: "📰"
  },
  lms: {
    name: "LMS",
    description: "Learning Management System with courses, lessons, and quizzes",
    icon: "📚"
  },
  fintech: {
    name: "FinTech",
    description: "Financial technology with transactions, wallets, and accounts",
    icon: "💳"
  },
  ecommerce: {
    name: "E-Commerce",
    description: "Online store with products, orders, cart, and payments",
    icon: "🛒"
  },
  saas: {
    name: "SaaS Starter",
    description: "Multi-tenant SaaS with subscriptions and teams",
    icon: "☁️"
  }
};

// CLI Options
const OPTIONS = {
  name: {
    type: "input",
    name: "projectName",
    message: "Project name:",
    default: "my-backend",
    validate: (input) => {
      if (!/^[a-z0-9-]+$/.test(input)) {
        return "Use lowercase letters, numbers, and hyphens only";
      }
      return true;
    }
  },
  template: {
    type: "list",
    name: "template",
    message: "Choose a template:",
    choices: Object.entries(TEMPLATES).map(([key, value]) => ({
      name: `${value.icon} ${value.name} - ${value.description}`,
      value: key
    }))
  },
  database: {
    type: "list",
    name: "database",
    message: "Choose a database:",
    choices: [
      { name: "MongoDB (Mongoose)", value: "mongodb" },
      { name: "PostgreSQL (Prisma)", value: "postgresql" }
    ]
  },
  packageManager: {
    type: "list",
    name: "packageManager",
    message: "Choose package manager:",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      { name: "pnpm", value: "pnpm" }
    ]
  },
  git: {
    type: "confirm",
    name: "git",
    message: "Initialize Git repository?",
    default: true
  },
  install: {
    type: "confirm",
    name: "install",
    message: "Install dependencies?",
    default: true
  }
};

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  let options = {
    projectName: args[0] || null,
    template: args.includes("--template") ? args[args.indexOf("--template") + 1] : null,
    database: args.includes("--database") ? args[args.indexOf("--database") + 1] : null,
    packageManager: args.includes("--pm") ? args[args.indexOf("--pm") + 1] : "npm",
    git: args.includes("--no-git") ? false : true,
    install: args.includes("--no-install") ? false : true
  };

  // Interactive mode if no template specified
  if (!options.template || !options.projectName) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██████╗ ███████╗████████╗██████╗  ██████╗                  ║
║  ██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗                 ║
║  ██║  ███╗█████╗    ██║   ██████╔╝██║   ██║                 ║
║  ██║   ██║██╔══╝    ██║   ██╔══██╗██║   ██║                 ║
║  ╚██████╔╝███████╗   ██║   ██║  ██║╚██████╔╝                 ║
║   ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝                  ║
║                                                              ║
║           Backend Framework for Modern Developers             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);

    // Ask for project name
    if (!options.projectName) {
      const nameResponse = await inquirer.prompt([OPTIONS.name]);
      options.projectName = nameResponse.projectName;
    }

    // Ask for template
    if (!options.template) {
      const templateResponse = await inquirer.prompt([OPTIONS.template]);
      options.template = templateResponse.template;
    }

    // Ask for database (except for blank template)
    if (options.template !== "blank" && !options.database) {
      const dbResponse = await inquirer.prompt([OPTIONS.database]);
      options.database = dbResponse.database;
    }

    // Ask for package manager
    if (!options.packageManager) {
      const pmResponse = await inquirer.prompt([OPTIONS.packageManager]);
      options.packageManager = pmResponse.packageManager;
    }

    // Ask for Git
    if (options.git === undefined) {
      const gitResponse = await inquirer.prompt([OPTIONS.git]);
      options.git = gitResponse.git;
    }

    // Ask for install
    if (options.install === undefined) {
      const installResponse = await inquirer.prompt([OPTIONS.install]);
      options.install = installResponse.install;
    }
  }

  // Set defaults
  options.template = options.template || "api";
  options.database = options.database || "mongodb";
  options.packageManager = options.packageManager || "npm";
  options.git = options.git !== false;
  options.install = options.install !== false;

  const targetDir = path.join(process.cwd(), options.projectName);

  console.log(`\n🚀 Creating ${TEMPLATES[options.template].name} project...\n`);

  // Copy template
  const templateDir = path.join(__dirname, "../templates", options.template);
  cpSync(templateDir, targetDir, { recursive: true });

  // Update package.json
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  pkg.name = options.projectName;
  pkg.version = "1.0.0";
  pkg.description = `${TEMPLATES[options.template].name} - Generated with BootNode`;
  
  // Update scripts based on package manager
  if (options.packageManager === "yarn") {
    pkg.scripts.dev = "nodemon server.js";
    pkg.scripts.start = "node server.js";
  } else if (options.packageManager === "pnpm") {
    pkg.scripts.dev = "nodemon server.js";
    pkg.scripts.start = "node server.js";
  }
  
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // Create .env from example
  const envExamplePath = path.join(targetDir, ".env.example");
  const envPath = path.join(targetDir, ".env");
  try {
    const envContent = readFileSync(envExamplePath, "utf-8");
    writeFileSync(envPath, envContent);
  } catch (e) {
    // No .env.example, create basic one
    writeFileSync(envPath, `PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/${options.projectName}
`);
  }

  // Initialize Git
  if (options.git) {
    console.log("📦 Initializing Git repository...");
    const { execSync } = await import("child_process");
    try {
      execSync("git init", { cwd: targetDir, stdio: "ignore" });
      execSync("git checkout -b main", { cwd: targetDir, stdio: "ignore" });
    } catch (e) {
      // Git might not be available
    }
  }

  // Install dependencies
  if (options.install) {
    console.log("\n📦 Installing dependencies...\n");
    const { execSync } = await import("child_process");
    const installCmd = options.packageManager === "yarn" ? "yarn" : 
                       options.packageManager === "pnpm" ? "pnpm install" : "npm install";
    execSync(installCmd, { cwd: targetDir, stdio: "inherit" });
  }

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                      ✅ Project Created!                       ║
╚══════════════════════════════════════════════════════════════╝

📁 Project: ${options.projectName}
📦 Template: ${TEMPLATES[options.template].name}
🗄️  Database: ${options.database === "mongodb" ? "MongoDB" : "PostgreSQL"}

📂 Project structure:
${targetDir}/

🚀 To start development:
   cd ${options.projectName}
   npm run dev

📖 Documentation:
   http://localhost:3000/api-docs

💡 Need help? Check the docs at:
   https://bootnode.dev/docs

🎉 Happy coding!
  `);
}

main().catch(console.error);
