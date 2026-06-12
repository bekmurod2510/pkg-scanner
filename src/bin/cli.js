#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cachePath = path.join(__dirname, "../data/cache.json");
let localCache = {};

try {
  if (fs.existsSync(cachePath)) {
    const rawCacheData = fs.readFileSync(cachePath, "utf-8");
    localCache = JSON.parse(rawCacheData);
  }
} catch (error) {
  localCache = {};
}

async function getPackageDescription(pkgName) {
  if (pkgName in localCache) {
    return (localCache)[pkgName];
  }

  try {
    const response = await fetch(`https://registry.npmjs.org/${pkgName}/latest`);
    if (!response.ok) {
      return "Could not find package description on npm registry.";
    }
    const data = (await response.json());
    return data.description || "No description provided by the author.";
  } catch (error) {
    return "Failed to fetch description (you might be offline).";
  }
}

async function run() {
  console.log("\n Scanning package.json dependencies...\n");

  const targetPackageJsonPath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(targetPackageJsonPath)) {
    console.error("Error: No package.json found.");
    process.exit(1);
  }

  try {
    const rawData = fs.readFileSync(targetPackageJsonPath, "utf-8");
    const parsedJson = JSON.parse(rawData);

    const dependencies = {
      ...parsedJson.dependencies,
      ...parsedJson.devDependencies,
    };

    // 1. Get all package names as an array
    const allPackageNames = Object.keys(dependencies);

    const packageNames = allPackageNames.filter(
      (pkgName) => pkgName !== "@bekmurod6574/explain-deps",
    );

    if (packageNames.length === 0) {
      console.log("Your package.json doesn't have any dependencies!");
      return;
    }

    for (const pkgName of packageNames) {
      const description = await getPackageDescription(pkgName);
      console.log(`\x1b[36m${pkgName}\x1b[0m: ${description}`);
      console.log("------------------------------------------------");
    }
  } catch (error) {
    console.error("Failed to parse package.json. Ensure it is valid JSON.");
  }
}

run();