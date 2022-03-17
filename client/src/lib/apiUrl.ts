const port = process.env.PORT;
const environment = process.env.NODE_ENV;

export const setApiUrl = (path: string) =>
  environment === 'development'
    ? 'http://localhost:1555/api' + path
    : '/api' + path;
