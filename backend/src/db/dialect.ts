import { env } from "@/utils/env";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";

export const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: env.CONNECTION_STRING,
	}),
});
