#!/usr/bin/env node
import { execSync } from "child_process";
import { copyFileSync, cpSync, mkdirSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const { projectName } = await inquirer.prompt([
    { name: "projectName", message: "Project name:", default: "my-app" },
  ]);

  const targetDir = path.join(process.cwd(), projectName);

  console.log(`📂 Creating project in ${targetDir} ...`);

  // Copy template folder into project
  cpSync(path.join(__dirname, "../template"), targetDir, { recursive: true });

  // Update package.json name
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = JSON.parse(
    await (await import("fs")).promises.readFile(pkgPath, "utf-8")
  );
  pkg.name = projectName;
  await (
    await import("fs")
  ).promises.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });

  console.log(`\n✅ Done! Now run:\n`);
  console.log(`   cd ${projectName}`);
  console.log(`   npm run dev`);
}

main();
