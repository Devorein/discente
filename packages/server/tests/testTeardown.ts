const { prisma } = require("../src/config");

module.exports = async function testTeardown() {
  await prisma.user.deleteMany({})
}