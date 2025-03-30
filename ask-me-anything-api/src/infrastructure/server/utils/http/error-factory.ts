import { HttpError, IHttpError } from "@infrastructure/server";

export const createHttpError = (httpError: IHttpError): HttpError => new HttpError(httpError);