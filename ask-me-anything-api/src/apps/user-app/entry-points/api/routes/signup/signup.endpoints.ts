import { Request, Response } from 'express';
import { SerializedBearerToken, SerializedCreateUser } from './signup.types';
import { UsernameAlreadyInUseServerError } from './signup.errors';
import { deserializeCreateUser, serializeBearerToken } from './signup.mappers';
import bcrypt from 'bcrypt';
import { ConfigurationService } from '@services/configuration';
import { UserModel } from '@apps/user-app/data-access/models';
import { TokenService } from '@services/entry-points/api/services/token';
import { STATUS_CODES } from '@services/entry-points/api';

const configurationService = new ConfigurationService();
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
    id: createdUser.id,
  });

  response.status(STATUS_CODES.CREATED).json(
    serializeBearerToken({
      token,
    }),
  );
};

export { post };
