import { Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError as OpenAPIHttpError } from 'express-openapi-validator/dist/framework/types';
import { HTTP_STATUS_CODES, isValidHttpStatusCodeKey, HttpStatusCode, IHttpError } from '@infrastructure/server';

type OpenApiRequestMiddlewareParams = {
  apiSpec: string;
};

export const openApiRequestMiddleware = ({ apiSpec }: OpenApiRequestMiddlewareParams) => OpenApiValidator.middleware({
  apiSpec,
  validateRequests: true,
  validateResponses: true,
});

type OpenApiResponseMiddlewareParams = {
  error: OpenAPIHttpError,
  response: Response<IHttpError>,
};

export const openApiResponseMiddleware = ({ error, response }: OpenApiResponseMiddlewareParams) => {
  const {
    errors: details,
    message: title,
    status: statusCode,
  } = error;
  console.log(error)

  const [detail] = details;

  const httpStatusCodeKey = Object.keys(HTTP_STATUS_CODES).find((httpStatusCodeKey) =>
    isValidHttpStatusCodeKey(httpStatusCodeKey) && HTTP_STATUS_CODES[httpStatusCodeKey] === statusCode
  );

  let httpStatusCode: HttpStatusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (httpStatusCodeKey && isValidHttpStatusCodeKey(httpStatusCodeKey)) {
    httpStatusCode = HTTP_STATUS_CODES[httpStatusCodeKey];
  }

  response.status(httpStatusCode).json({
    code: 'OPENAPI_ERROR',
    detail: detail.message,
    statusCode: httpStatusCode,
    title: 'There was an error validating the request.',
  });
};
