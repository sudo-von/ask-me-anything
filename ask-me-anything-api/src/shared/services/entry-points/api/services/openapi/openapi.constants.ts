import path from 'path';

export const openApiPaths = path.join(__dirname, '..', '..', 'server', 'routes');

export const openApiYaml = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  '@sudo-von',
  'ask-me-anything-core',
  'openapi.yaml',
);