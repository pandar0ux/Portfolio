import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";

const buildClientDir = path.join(process.cwd(), "build", "client");
const indexPath = path.join(buildClientDir, "index.html");
const notFoundPath = path.join(buildClientDir, "404.html");

if (!existsSync(indexPath)) {
    console.error("index.html not found in build/client. Run the build first.");
    process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log("Created build/client/404.html for SPA routing.");
