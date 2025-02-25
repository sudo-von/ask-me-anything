import express from 'express';

import { components } from 'shared-ask-me-anything/src/types';

type User = components['schemas']['User']['data']['attributes'];

const app = express();

const port = 3000;

const user: User = {
  avatar: 'avatar',
  name: 'name',
  username: 'username',
};

app.get('/', (req, res) => {
  res.json(user);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));