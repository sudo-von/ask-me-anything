import { UserModel } from "@infrastructure/database";
import { Request, Response } from "express";
import { BearerToken, CreateUser } from "./types";
import { ValidationError } from "@infrastructure/server/routes/types";
import { deserializeCreateUser } from "./deserializers";
import { HTTP_STATUS_CODES } from "@infrastructure/server/utils/http/status-codes";

type PostRequest = Request<{}, {}, CreateUser>;
type PostResponse = Response<BearerToken | ValidationError>;

const post = async (request: PostRequest, response: PostResponse) => {
  try {
    const createUser = deserializeCreateUser(request.body);

    const existingUser = await UserModel.findOne({
      where: {
        username: createUser.username,
      },
    });

    if (existingUser) {
      return response.status(HTTP_STATUS_CODES.CONFLICT).json({
        errors: ['Username already exists'],
        message: 'This username is already in use. Please choose another one.',
      });
    }

    console.log('abcddsa');

    console.log(attributes)
    const result = await UserModel.create({
      avatar: '',
      name: attributes.name,
      password: attributes.password,
      username: attributes.username,
    });
    console.log(result)

    return response.status(201).json({
      data: {
        type: 'bearerToken',
        attributes: {
          token: 'a.b.c'
        },
      },
    });
  } catch (e) {
    const error = e as Error;
    console.log(e);

    return response.status(500).json({
      errors: ['No idea'],
      message: error.message,
      status: 500,
    });
  }
};

export {
  post,
};