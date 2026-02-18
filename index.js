#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/* ----------------- Helper: create .gitignore ----------------- */
const createGitignore = (folder, content) => {
  fs.writeFileSync(path.join(folder, ".gitignore"), content);
};

/* ----------------- Backend creation ----------------- */
const createBackend = (dest) => {
  const backendPath = path.join(dest, "backend");
  fs.mkdirSync(backendPath, { recursive: true });

  ["src/config", "src/controllers", "src/models", "src/routes", "src/middlewares", "src/utils"]
    .forEach(folder => fs.mkdirSync(path.join(backendPath, folder), { recursive: true }));

  fs.writeFileSync(
    path.join(backendPath, "server.js"),
    `const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (req, res) => res.send('Backend is running'));
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
  );

  fs.writeFileSync(
    path.join(backendPath, "package.json"),
    JSON.stringify({
      name: "backend",
      version: "1.0.0",
      main: "server.js",
      scripts: { start: "node server.js", dev: "nodemon server.js" },
      dependencies: { express: "^4.18.2" },
      devDependencies: { nodemon: "^3.0.2" }
    }, null, 2)
  );

  // .gitignore for backend
  createGitignore(backendPath, `node_modules
.env
`);

  console.log("✅ Backend created");
  console.log("⚡ Installing backend dependencies...");
  execSync("npm install", { cwd: backendPath, stdio: "inherit" });
};

/* ----------------- Frontend creation ----------------- */
const createFrontend = (dest) => {
  const frontendPath = path.join(dest, "frontend");
  fs.mkdirSync(frontendPath, { recursive: true });

  // 1️⃣ Run Vite + React
  console.log("⚡ Creating Vite React app...");
  execSync("npm create vite@latest . -- --template react", {
    cwd: frontendPath,
    stdio: "inherit"
  });

  // 2️⃣ Install frontend dependencies
  console.log("⚡ Installing frontend dependencies...");
  execSync("npm install", { cwd: frontendPath, stdio: "inherit" });

  // 3️⃣ Create professional folders inside src
  const srcPath = path.join(frontendPath, "src");
  ["assets", "components", "pages", "context", "hooks", "services", "utils"]
    .forEach(folder => fs.mkdirSync(path.join(srcPath, folder), { recursive: true }));

  // 4️⃣ Create sample component
  fs.writeFileSync(
    path.join(srcPath, "components/Hello.jsx"),
    `import React from "react";

export default function Hello() {
  return <h1>Hello from MERN Skeleton Frontend!</h1>;
}`
  );

  // 5️⃣ Create sample API service
  fs.writeFileSync(
    path.join(srcPath, "services/api.js"),
    `import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export default API;`
  );

  // 6️⃣ Optional: update App.jsx to import Hello
  fs.writeFileSync(
    path.join(srcPath, "App.jsx"),
    `import React from "react";
import Hello from "./components/Hello";

function App() {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;`
  );

  // .gitignore for frontend
  createGitignore(frontendPath, `node_modules
dist
.env
`);

  console.log("✅ Frontend ready with professional folder structure!");
};

/* ----------------- Main CLI ----------------- */
const projectName = process.argv[2] || "my-mern-app";
const projectType = process.argv[3] || "full"; // "backend", "frontend", "full"
const destPath = path.join(process.cwd(), projectName);

fs.mkdirSync(destPath, { recursive: true });

if (projectType === "backend" || projectType === "full") createBackend(destPath);
if (projectType === "frontend" || projectType === "full") createFrontend(destPath);

console.log(`🎉 Project ${projectName} setup complete!`);
console.log("Backend entry point: backend/server.js");
console.log("Frontend entry point: frontend/src/main.jsx (Vite-ready)");
console.log("\nRun backend: cd backend && npm run dev");
console.log("Run frontend: cd frontend && npm run dev");
