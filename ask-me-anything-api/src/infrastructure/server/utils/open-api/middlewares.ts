import { Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError as OpenAPIHttpError } from 'express-openapi-validator/dist/framework/types';
import { Http } from '@infrastructure/server';

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
  response: Response<Http.IHttpError>,
};

export const openApiResponseMiddleware = ({ error, response }: OpenApiResponseMiddlewareParams) => {
  const {
    message: detail,
    status: statusCode,
  } = error;

  console.log('SADHJKASDHJDASHJASDHSA')

  const httpStatusCodeKey = Object.keys(Http.HTTP_STATUS_CODES).find((httpStatusCodeKey) =>
    Http.isValidHttpStatusCodeKey(httpStatusCodeKey) && Http.HTTP_STATUS_CODES[httpStatusCodeKey] === statusCode
  );

  let httpStatusCode: Http.HttpStatusCode = Http.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (httpStatusCodeKey && Http.isValidHttpStatusCodeKey(httpStatusCodeKey)) {
    httpStatusCode = Http.HTTP_STATUS_CODES[httpStatusCodeKey];
  }

  response.status(httpStatusCode).json({
    code: 'OPENAPI_ERROR',
    detail,
    statusCode: httpStatusCode,
    title: 'There was an error validating the request.',
  });
};
