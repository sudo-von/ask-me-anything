import path from 'path';

export const openApiPaths = path.join(process.cwd(), 'src', 'apps', 'user-app', 'entry-points', 'api', 'routes');

export const openApiYaml = path.join(
  process.cwd(),
  'node_modules',
  '@sudo-von',
  'ask-me-anything-core',
  'openapi.yaml',
);