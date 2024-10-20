import { ServerResponse, IncomingMessage } from 'http';
import { HTTPMethods } from '../types/methods';
import { routeHandler } from '../routes/route-handler';
import { notFoundUrl } from '../utils/not-found-url';

type HandleAllRequestFunction = (
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<void>;

export const handleAllRequest: HandleAllRequestFunction = async (
  request,
  response,
) => {
  try {
    if (request.method && request.method === HTTPMethods.Options) {
      const now = new Date().toISOString();
      response.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE,OPTIONS',
      );

      response.setHeader('Access-Control-Allow-Origin', '*'); //imitate CORS behavior
      response.setHeader('Date', now);
      response.writeHead(204, { 'Content-Type': 'text/plain' });
      response.end();
      return;
    }

    const reqUrl = request.url ?? '';
    const url = new URL(reqUrl, `http://${request.headers.host}`);
    const pathname: string = url.pathname.replace(/\/$/gi, '');

    const isRouteExist = await routeHandler(request, response, pathname);
    if (!isRouteExist) {
      notFoundUrl(response);
      return;
    }
  } catch {
    response.writeHead(500, { 'content-Type': 'application/json' });
    response.end(
      JSON.stringify({ status: 500, message: 'Server error occurred!' }),
    );
  }
};
