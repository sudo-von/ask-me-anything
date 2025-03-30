import { Handler } from "express";

const POST: Handler = (_request, response) => {
  response.status(201).json({
    data: {
      type: '',
      attributes: {
        id: '',
        avatar: '',
        name: '',
        username: '',
      },
    }
  });
};

export {
  POST,
};