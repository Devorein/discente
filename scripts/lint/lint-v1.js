#!usr/bin/env zx

const totalSteps = 4;
let currentStep = 0;
const commandWrapper = require("../commandWrapper");

// Command wrapper
async function cwr(command, skip, message) {
  currentStep+=1;
  message = `[${currentStep}/${totalSteps}] ${message}`
  await commandWrapper(command, skip, message)
}

async function lintPackage(package, skip) {
  cd(`${process.env.GITHUB_WORKSPACE}/packages/${package}`)
  await cwr(() => $`npm run lint`, skip, `lint ${package} package`)
}

async function lint() {
  const SHARED_UPDATED = process.env.SHARED_UPDATED === "true";
  const SERVER_UPDATED = process.env.SERVER_UPDATED === "true";
  const CLIENT_UPDATED = process.env.CLIENT_UPDATED === "true";

  await lintPackage("shared", !SHARED_UPDATED)
  await lintPackage("server", !SERVER_UPDATED)
  await lintPackage("client", !CLIENT_UPDATED)
}

lint();