import { dialect } from "@/db/dialect";
import { env } from "@/utils/env";
import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "kysely-codegen";

export const db = new Kysely<DB>({
	dialect,
	plugins: [new CamelCasePlugin()],
	log: env.MODE === "dev" ? ["query", "error"] : [],
});
