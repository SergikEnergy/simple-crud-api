import { IncomingMessage, ServerResponse } from 'http';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../services/users';
import { prepareResponseData } from '../utils/prepare-response-data';
import { getDataFromRequest } from '../utils/get-data-from-request';
import { RESPONSE_MESSAGES } from '../constants/response-messages';
import { setResponseNotUuidFormat } from '../utils/set-response-not-uuid-format';

export const getAllUsersRequestHandler = async (
  _: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const users = await getAllUsers();
    prepareResponseData(res, 200, users);
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: RESPONSE_MESSAGES.error500,
    });
  }
};

export const getUserRequestHandler = async (
  _: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!setResponseNotUuidFormat(res, id)) return;

  try {
    const userInfo = await getUserById(id);

    if (!userInfo) {
      prepareResponseData(res, 404, {
        status: 404,
        message: RESPONSE_MESSAGES.userNotFound,
      });
      return;
    }

    prepareResponseData(res, 200, userInfo);
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: RESPONSE_MESSAGES.error500,
    });
  }
};

export const createUserRequestHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const { age, hobbies, username } = await getDataFromRequest(req);
    if (!age || !Array.isArray(hobbies) || !username) {
      prepareResponseData(res, 400, {
        status: 400,
        message: RESPONSE_MESSAGES.fieldRequired,
      });
      return;
    }
    const newUser = await createUser({ age, hobbies, username });
    prepareResponseData(res, 201, newUser);
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: RESPONSE_MESSAGES.error500,
    });
  }
};

export const deleteUserRequestHandler = async (
  _: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!setResponseNotUuidFormat(res, id)) return;

  try {
    const isUserDeleted = await deleteUserById(id);
    if (!isUserDeleted) {
      return prepareResponseData(res, 404, {
        status: 404,
        message: RESPONSE_MESSAGES.userNotFound,
      });
    }

    res.writeHead(204).end();
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: RESPONSE_MESSAGES.error500,
    });
  }
};

export const updateUserRequestHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!setResponseNotUuidFormat(res, id)) return;

  try {
    const userData = await getDataFromRequest(req);

    const userInfo = await updateUserById(userData, id);

    if (!userInfo) {
      return prepareResponseData(res, 404, {
        status: 404,
        message: RESPONSE_MESSAGES.userNotFound,
      });
    }

    prepareResponseData(res, 200, userInfo);
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: RESPONSE_MESSAGES.error500,
    });
  }
};
