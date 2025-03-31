import { Models } from "@database";
import { Request, Response } from "express";
import { BearerToken, CreateUser } from "./types";
import { HttpUsernameAlreadyInUseError } from "./errors";
import { deserializeCreateUser, serializeBearerToken } from "./mappers";
import bcrypt from "bcrypt";
import { EnvironmentVariables } from "@utils";
import { Http } from "utils";

const { SALT_ROUNDS } = EnvironmentVariables.environmentVariables;
const { HTTP_STATUS_CODES } = Http;
const { UserModel } = Models;

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
    throw new HttpUsernameAlreadyInUseError();
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await UserModel.create({
    avatar: "fake-avatar",
    name,
    password: hashedPassword,
    username,
  });

  response.status(HTTP_STATUS_CODES.CREATED).json(
    serializeBearerToken({
      token: "fake.user.token",
    })
  );
};

export { post };
