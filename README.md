# SvelteKit SQLite Example 1

To run typescript scripts look at the `ts-node` setup in `tsconfig.json`.

## Code Creation

```bash
npm create svelte@latest svelte-sqlite-ex1
npm i
npm i -D better-sqlite3
npm i -D @types/better-sqlite3
npm i -D sqlite3
sudo apt install sqlite3
sudo apt-get install sqlitebrowser
npm i -D ts-node # to run ts script files
npm install @picocss/pico
```

### Prisma Setup With Existing Db

https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-postgres

```bash
# install and connect
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
# pull schema
npx prisma db pull --force
# create and apply initial migration
mkdir -p prisma/migrations/0_init
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
npx prisma migrate resolve --applied 0_init
# install client
npm install @prisma/client
npx prisma generate
```

## Code History

The code in this repository is based on the following videos.

- [SvelteKit 1.0 with SQLite Tutorial](https://youtu.be/iO4VUbQ6ua4)
- [Authentication and Authorization in SvelteKit 1 with SQLite](https://youtu.be/XRa-b5E7x8w)

Use the [chinook sample db](https://www.sqlitetutorial.net/sqlite-sample-database/).
