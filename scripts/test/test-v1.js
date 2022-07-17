#!usr/bin/env zx
const totalSteps = 2;
let currentStep = 0;
const commandWrapper = require("../commandWrapper");

// Command wrapper
async function cwr(command, skip, message) {
  currentStep+=1;
  message = `[${currentStep}/${totalSteps}] ${message}`
  await commandWrapper(command, skip, message)
}

async function testPackage(package, skip) {
  cd(`${process.env.GITHUB_WORKSPACE}/packages/${package}`)
  await cwr(() => $`npm run test`, skip, `test ${package} package`)
}

async function test() {
  const SERVER_UPDATED = process.env.SERVER_UPDATED === "true";
  const CLIENT_UPDATED = process.env.CLIENT_UPDATED === "true";

  await testPackage("server", !SERVER_UPDATED)
  await testPackage("client", !CLIENT_UPDATED)
}

test();