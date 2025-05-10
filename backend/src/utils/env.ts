import { logger } from "@/utils/logger";
import { z } from "zod";

const envVariables = z.object({
	MODE: z.enum(["dev", "test", "prod"]).default("dev"),
	CONNECTION_STRING: z.string().default("postgres://postgres:postgres@localhost:5432/postgres"),
	PORT: z.coerce.number().default(80),
	BINDINGS: z.object({}).default({}),
	VARIABLES: z.object({}).default({}),
});

const { error, data } = envVariables.safeParse(process.env);

if (error) {
	logger.error("Environment variables validation failed:");

	for (const issue of error.errors) {
		const envName = issue.path.join(".");
		const currentValue = process.env[envName];
		logger.warn(`[${envName}=${currentValue}] ${issue.message}`);
	}

	process.exit(1);
} else {
	logger.success("Environment variables loaded successfully.");
}

export type Env = z.infer<typeof envVariables>;
export type Variables = z.infer<typeof envVariables>["VARIABLES"];
export type Bindings = z.infer<typeof envVariables>["BINDINGS"];

export const env: Env = { ...process.env, ...data } as unknown as Env;
