#!/usr/bin/env bun

import { $ } from "bun";
import { readFileSync } from "fs";
import { createInterface } from "readline";

// Get the last release version
async function getLastReleaseVersion(): Promise<string | null> {
  try {
    const result = await $`gh release list --limit 1 --json tagName`.quiet();
    const releases = JSON.parse(result.stdout.toString());
    return releases.length > 0 ? releases[0].tagName : null;
  } catch (error) {
    return null;
  }
}

// Prompt user for input
function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log("🚀 Release Publisher\n");

  // Get last release version
  const lastVersion = await getLastReleaseVersion();
  if (lastVersion) {
    console.log(`📦 Last release: ${lastVersion}\n`);
  } else {
    console.log("📦 No previous releases found\n");
  }

  // Get current version from package.json
  const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
  const currentVersion = packageJson.version;
  console.log(`📋 Current version in package.json: ${currentVersion}\n`);

  // Prompt for release version
  const version = await prompt("Enter release version (e.g., v1.0.0): ");
  if (!version) {
    console.error("❌ Version is required");
    process.exit(1);
  }

  // Prompt for release name
  const name = await prompt("Enter release name: ");
  if (!name) {
    console.error("❌ Release name is required");
    process.exit(1);
  }

  // Create the release
  console.log(`\n📝 Creating release ${version}...`);
  try {
    await $`gh release create ${version} --title ${name} --notes "Release ${version}: ${name}"`;
    console.log(`\n✅ Successfully created release ${version}!`);
    console.log(`\n🔄 GitHub Actions workflow will now deploy to GitHub Pages...`);
  } catch (error) {
    console.error(`\n❌ Failed to create release: ${error}`);
    process.exit(1);
  }
}

main();

