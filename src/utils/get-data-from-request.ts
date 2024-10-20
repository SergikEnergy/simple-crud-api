import { IncomingMessage } from 'http';
import { UserRequestType } from '../types/server';

export const getDataFromRequest = (
  req: IncomingMessage,
): Promise<UserRequestType> =>
  new Promise((res, rej) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('error', rej);

    req.on('end', () => {
      try {
        res(JSON.parse(data) as UserRequestType);
      } catch {
        rej('Not JSON format');
      }
    });
  });
