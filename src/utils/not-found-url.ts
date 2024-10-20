import { ServerResponse } from 'http';

export const notFoundUrl = (res: ServerResponse): void => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      status: 404,
      message: "Url, that you provided doesn't exist",
    }),
  );
};
