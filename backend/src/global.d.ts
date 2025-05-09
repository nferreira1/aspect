import type { Bindings, Variables } from "@/utils/env";

declare module "hono" {
	interface ContextVariableMap {}
}

declare global {
	interface Env extends Variables, Bindings {}
}
