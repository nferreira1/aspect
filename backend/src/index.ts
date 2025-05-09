import { env } from "@/utils/env";
import { logger } from "@/utils/logger";
import { serve } from "@hono/node-server";
import { Hono } from "hono/tiny";

const app = new Hono<Env>();

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => logger.info(`Server started on port ${info.port}`),
);
