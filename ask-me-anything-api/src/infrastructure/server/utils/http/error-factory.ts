import { HttpError } from "./error";
import { IHttpError } from "./types";

export const createHttpError = (httpError: IHttpError): HttpError => new HttpError(httpError);