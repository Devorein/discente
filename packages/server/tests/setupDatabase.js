const pgtools = require("pgtools")
const {spawn} = require("child_process")

const {DB_URL, NODE_ENV} = process.env;
const dbName = DB_URL.split("/").at(-1)

pgtools.dropdb(DB_URL, dbName, (dropDbErr) => {
  if (dropDbErr) {
    console.log(`Database ${dbName} doesn't exist`);
  }

  pgtools.createdb(DB_URL, dbName, (createDbErr) => {
    if (createDbErr) {
      console.log(createDbErr);
      process.exit(1);
    }
    const prismaMigrate = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', NODE_ENV === "test" ? 'prisma-migrate:test' : 'prisma-migrate'])
    prismaMigrate.stdout.on('data', (data) => {
      console.log(data.toString())
    })
    prismaMigrate.on('exit', (code) => {
      console.log(`Prisma migrate script existed with code ${  code.toString()}`);
    });
  })
})