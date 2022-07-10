const { prisma: db } = require("../src/config");

module.exports = async function testTeardown() {
  await db.user.deleteMany({})
}