import path from 'path';

const cwd = process.cwd();

const openApiUserPath = path.join(
  cwd,
  'src',
  'apps',
  'user-app',
  'entry-points',
  'api',
  'routes',
);

export const openApiPaths = [
  { path: openApiUserPath },
];

export const openApiYaml = path.join(
  cwd,
  'node_modules',
  '@sudo-von',
  'ask-me-anything-core',
  'openapi.yaml',
);
