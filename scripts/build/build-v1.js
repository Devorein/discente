#!usr/bin/env zx

const totalSteps = 6;
let currentStep = 0;
const commandWrapper = require("../commandWrapper");

// Command wrapper
async function cwr(command, skip, message) {
  currentStep+=1;
  message = `[${currentStep}/${totalSteps}] ${message}`
  await commandWrapper(command, skip, message)
}

async function buildPackage(package, skip) {
  cd(`${process.env.GITHUB_WORKSPACE}/packages/${package}`)
  if (package === "client") {
    await cwr(() => $`npm run build-storybook`, skip, 'build storybook')
  }
  await cwr(() => $`npm run build`, skip, `build ${package} package`)
}

async function build() {
  const SERVER_UPDATED = process.env.SERVER_UPDATED === "true";
  const CLIENT_UPDATED = process.env.CLIENT_UPDATED === "true";
  const SHARED_UPDATED = process.env.SHARED_UPDATED === "true";
  
  // Skip building shared if none of the other packages changed
  await buildPackage("shared", !SHARED_UPDATED && !SERVER_UPDATED && !CLIENT_UPDATED)
  cd(`${process.env.GITHUB_WORKSPACE}/packages/server`)
  await cwr(() => $`npm run prisma:generate`, !CLIENT_UPDATED && !SERVER_UPDATED, 'generate prisma artifacts')
  await buildPackage("server", !SERVER_UPDATED)
  await buildPackage("client", !CLIENT_UPDATED)
}

build();