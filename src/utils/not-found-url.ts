import { ServerResponse } from 'http';
import { RESPONSE_MESSAGES } from '../constants/response-messages';

export const notFoundUrl = (res: ServerResponse): void => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      status: 404,
      message: RESPONSE_MESSAGES.urlNotFound,
    }),
  );
};
