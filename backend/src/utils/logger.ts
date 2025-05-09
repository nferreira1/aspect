import { blue, bold, cyan, gray, green, magenta, red, white, yellow } from "colorette";

type LogLevel = "info" | "success" | "warn" | "error" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

const levelColors: Record<LogLevel, (text: string) => string> = {
	info: cyan,
	success: green,
	warn: yellow,
	error: red,
	GET: green,
	POST: blue,
	PUT: yellow,
	DELETE: red,
	PATCH: magenta,
	OPTIONS: cyan,
};

const levelIcons: Record<LogLevel, string> = {
	info: "ℹ️ ",
	success: "✅",
	warn: "⚠️",
	error: "❌",
	GET: "📍",
	POST: "📍",
	PUT: "📍",
	DELETE: "📍",
	PATCH: "📍",
	OPTIONS: "📍",
};

function log(level: LogLevel, message: string) {
	const timestamp = new Date().toISOString();
	const rawLevel = `[${level.toUpperCase()}]`;
	const paddedLevel = rawLevel.padEnd(10, " ");
	const coloredLevel = levelColors[level](paddedLevel);

	const icon = levelIcons[level];

	console.log(`${bold(coloredLevel)}${bold(gray(timestamp))} ${bold("-")} ${icon} ${message}`);
}

function colorStatus(statusCode: number): string {
	if (statusCode >= 200 && statusCode < 300) return green(`${statusCode}`);
	if (statusCode >= 300 && statusCode < 400) return blue(`${statusCode}`);
	if (statusCode >= 400 && statusCode < 500) return yellow(`${statusCode}`);
	if (statusCode >= 500) return red(`${statusCode}`);
	return white(`${statusCode}`);
}

function colorResponseTime(ms: number): string {
	if (ms < 100) return green(`${ms}ms`);
	if (ms < 500) return yellow(`${ms}ms`);
	return red(`${ms}ms`);
}

export function logHttpRequest(method: string, path: string, statusCode: number, responseTimeMs: number, ip: string) {
	const upperMethod = method.toUpperCase() as LogLevel;

	const statusColored = colorStatus(statusCode);
	const responseTimeColored = colorResponseTime(responseTimeMs);

	const message = `${path} (${statusColored}) in ${responseTimeColored} from ${ip}`;

	log(upperMethod, message);
}

export const logger = {
	info: (msg: string) => log("info", msg),
	success: (msg: string) => log("success", msg),
	warn: (msg: string) => log("warn", msg),
	error: (msg: string) => log("error", msg),
	http: logHttpRequest,
};
