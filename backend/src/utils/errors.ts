import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";

export class Error {
	constructor(
		public field: string,
		public message: string,
	) {
		this.field = field;
		this.message = message;
	}
}

export class ErrorResponseException extends HTTPException {
	constructor(
		status: ContentfulStatusCode,
		public title: string,
		public message: string,
		public errors: Error[] = [],
	) {
		super(status, { message });
	}

	getResponse = () =>
		new Response(
			JSON.stringify({
				status: this.status,
				title: this.title,
				message: this.message,
				errors: this.errors,
			}),
			{
				status: this.status,
				headers: { "Content-Type": "application/json" },
				statusText: this.status.toString(),
			},
		);
}

export class ZodErrorResponseException extends ErrorResponseException {}
