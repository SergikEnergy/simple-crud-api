import { ServerResponse, IncomingMessage } from 'http';
import { HTTPMethods } from '../types/methods';

type HandleAllRequestFunction = (
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<void>;

export const handleAllRequest: HandleAllRequestFunction = (req, resp) => {
  if (req.method && req.method === HTTPMethods.Options) {
    const now = new Date().toISOString();
    resp.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE,OPTIONS',
    );

    resp.setHeader('Access-Control-Allow-Origin', '*'); //imitate CORS behavior
    resp.setHeader('Date', now);
    resp.writeHead(204, { 'Content-Type': 'text/plain' });
    resp.end();
    return Promise.resolve();
  }

  console.log(req.url, req.headers, req.url);

  const reqUrl = req.url ?? '';
  const url = new URL(reqUrl, `http://${req.headers.host}`);
  const pathname: string = url.pathname.replaceAll(/\/$/, '');

  // const isRouteExist=await

  return Promise.resolve();
};
