import { Request, Response } from 'express';
import { SerializedBearerToken, SerializedCreateUser } from './types';
import { UsernameAlreadyInUseServerError } from './errors';
import { deserializeCreateUser, serializeBearerToken } from './mappers';
import bcrypt from 'bcrypt';
import { getEnvironmentVariables } from '@services/environment-variables';
import { UserModel } from '@database/models';
import { STATUS_CODES } from '@utils/http';

const { SALT_ROUNDS } = getEnvironmentVariables();

type Post = (
  request: Request<unknown, unknown, SerializedCreateUser>,
  response: Response<SerializedBearerToken>,
) => Promise<void>;

const post: Post = async (request, response) => {
  const { name, username, password } = deserializeCreateUser(request.body);

  const existingUser = await UserModel.findOne({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw new UsernameAlreadyInUseServerError();
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await UserModel.create({
    avatar: 'fake-avatar',
    name,
    password: hashedPassword,
    username,
  });

  response.status(STATUS_CODES.CREATED).json(
    serializeBearerToken({
      token: 'fake.user.token',
    }),
  );
};

export { post };
