import { Request, Response } from 'express';
import { SerializedBearerToken } from './signup.types';
import bcrypt from 'bcrypt';
import { ConfigurationService } from '@services/configuration';
import { UserModel } from '@apps/user-app/data-access/models';
import { TokenService } from '@services/authentication/token';
import { STATUS_CODES } from '@services/entry-points/api';
import {
  deserializeCreateUser,
  SerializedCreateUser,
  UsernameAlreadyInUseServerError,
} from '@apps/user-app/entry-points/api/routes/user';
import { serializeBearerToken } from './signup.mappers';

const configurationService = ConfigurationService.getInstance();
const SALT_ROUNDS = configurationService.get('SALT_ROUNDS');

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

  const createdUser = await UserModel.create({
    avatar: 'fake-avatar',
    name,
    password: hashedPassword,
    username,
  });

  const token = TokenService.sign({
    avatar: createdUser.avatar,
    name: createdUser.name,
    username: createdUser.username,
  });

  response.status(STATUS_CODES.CREATED).json(
    serializeBearerToken({
      token,
    }),
  );
};

export { post };
