import { ServerResponse, IncomingMessage } from 'http';
import { HTTPMethods } from '../types/methods';
import { routeHandler } from '../routes/route-handler';
import { notFoundUrl } from '../utils/not-found-url';

type HandleAllRequestFunction = (
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<void>;

export const handleAllRequest: HandleAllRequestFunction = async (req, resp) => {
  try {
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
      return;
    }

    const reqUrl = req.url ?? '';
    const url = new URL(reqUrl, `http://${req.headers.host}`);
    const pathname: string = url.pathname.replace(/\/$/gi, '');

    const isRouteExist = await routeHandler(req, resp, pathname);
    if (!isRouteExist) {
      notFoundUrl(resp);
      return;
    }
  } catch {
    resp.writeHead(500, { 'content-Type': 'application/json' });
    resp.end(
      JSON.stringify({ status: 500, message: 'Server error occurred!' }),
    );
  }
};
