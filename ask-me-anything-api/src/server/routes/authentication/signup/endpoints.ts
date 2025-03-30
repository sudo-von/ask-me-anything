import { Models } from "@database";
import { Request, Response } from "express";
import { BearerToken, CreateUser } from "./types";
import { deserializeCreateUser } from "./deserializers";
import { usernameAlreadyInUse } from "./errors";
import { Http } from "@services";
import { serializeBearerToken } from "./serializers";
import bcrypt from "bcrypt";
import { EnvironmentVariables } from "@utils";

const { UserModel } = Models;

const { SALT_ROUNDS } = EnvironmentVariables.getEnvironmentVariables();

type Post = (
  request: Request<{}, {}, CreateUser>,
  response: Response<BearerToken>
) => Promise<void>;

const post: Post = async (request, response) => {
  const { name, username, password } = deserializeCreateUser(request.body);

  const existingUser = await UserModel.findOne({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw usernameAlreadyInUse;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await UserModel.create({
    avatar: "fake-avatar",
    name,
    password: hashedPassword,
    username,
  });

  response.status(Http.HTTP_STATUS_CODES.CREATED).json(
    serializeBearerToken({
      token: "fake.user.token",
    })
  );
};

export { post };
