import { dialect } from "@/db/dialect";
import { CamelCasePlugin } from "kysely";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
	dialect,
	migrations: {
		migrationFolder: "./src/db/migrations",
		migrationTableName: "__migrations__",
		migrationLockTableName: "__migrations_lock__",
	},
	seeds: {
		seedFolder: "./src/db/seeds",
	},
	plugins: [new CamelCasePlugin()],
});
