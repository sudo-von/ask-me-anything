import { NextFunction, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError as OpenAPIHttpError } from 'express-openapi-validator/dist/framework/types';
import { Http } from '@utils';

const { HTTP_STATUS_CODES, isValidHttpStatusCodeKey } = Http;

type OpenApiRequestMiddlewareParams = {
  apiSpec: string;
};

export const openApiRequestMiddleware = ({
  apiSpec,
}: OpenApiRequestMiddlewareParams) =>
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
  });

type OpenApiResponseMiddlewareParams = {
  error: OpenAPIHttpError;
  next: NextFunction;
  response: Response<Http.IHttpError>;
};

export const openApiResponseMiddleware = ({
  error,
  next,
  response,
}: OpenApiResponseMiddlewareParams) => {
  if (!(error instanceof OpenAPIHttpError)) {
    return next();
  }

  const { message: detail, status: statusCode } = error;

  const httpStatusCodeKey = Object.keys(HTTP_STATUS_CODES).find(
    (httpStatusCodeKey) =>
      isValidHttpStatusCodeKey(httpStatusCodeKey) &&
      HTTP_STATUS_CODES[httpStatusCodeKey] === statusCode,
  );

  let httpStatusCode: Http.HttpStatusCodeValue =
    HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (httpStatusCodeKey && isValidHttpStatusCodeKey(httpStatusCodeKey)) {
    httpStatusCode = HTTP_STATUS_CODES[httpStatusCodeKey];
  }

  response.status(httpStatusCode).json({
    code: 'OPENAPI_ERROR',
    detail,
    statusCode: httpStatusCode,
    title: 'There was an error validating the request.',
  });
};
