import { IncomingMessage, ServerResponse } from 'http';
import { API_ENDPOINTS } from '../constants/endpoints';
import { HTTPMethods } from '../types/methods';
import {
  getAllUsersRequestHandler,
  getUserRequestHandler,
  createUserRequestHandler,
  deleteUserRequestHandler,
  updateUserRequestHandler,
} from '../service/requests-handler';

type RouteHandlerFunction = (
  request: IncomingMessage,
  response: ServerResponse,
  endpoint: string,
) => Promise<boolean>;

export const routeHandler: RouteHandlerFunction = async (
  req,
  res,
  endpoint,
) => {
  const userIdMatch = endpoint.match(/^\/api\/users\/([a-f0-9-]+)\/?$/);
  // check uuid param with regexp - contains only character in english, numbers from 0 to 9 or '-' sign
  // checking user id format provide further in the app

  const userId = userIdMatch ? userIdMatch[1] : null;

  switch (req.method) {
    case HTTPMethods.Get: {
      if (endpoint === API_ENDPOINTS.users) {
        await getAllUsersRequestHandler(req, res);
        return true;
      }
      if (!userId) break;
      await getUserRequestHandler(req, res, userId);
      return true;
    }

    case HTTPMethods.Post: {
      await createUserRequestHandler(req, res);
      return true;
    }

    case HTTPMethods.Delete: {
      if (!userId) break;
      await deleteUserRequestHandler(req, res, userId);
      return true;
    }

    case HTTPMethods.Put: {
      if (!userId) break;
      await updateUserRequestHandler(req, res, userId);
      return true;
    }

    default: {
      // when method is not defined
      return false;
    }
  }

  //when route is not defined
  return false;
};
