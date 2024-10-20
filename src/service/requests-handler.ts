import { IncomingMessage, ServerResponse } from 'http';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../services/users';
import { prepareResponseData } from '../utils/prepare-response-data';
import { validate as validateUuid } from 'uuid';
import { getDataFromRequest } from '../utils/get-data-from-request';

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
      message: 'Oops! Server error.',
    });
  }
};

export const getUserRequestHandler = async (
  _: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!validateUuid(id)) {
    prepareResponseData(res, 400, {
      status: 400,
      message: 'Invalid User ID format',
    });
    return;
  }

  try {
    const userInfo = await getUserById(id);
    if (!userInfo) {
      prepareResponseData(res, 404, {
        status: 404,
        message: 'User not found!',
      });
      return;
    }

    prepareResponseData(res, 200, userInfo);
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: 'Oops! Server error.',
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
        message: 'Bad request! Field username, hobbies, age are required.',
      });
      return;
    }
    const newUser = await createUser({ age, hobbies, username });
    prepareResponseData(res, 200, newUser);
  } catch (err) {
    console.error(err);
    prepareResponseData(res, 500, {
      status: 500,
      message: 'Oops! Server error.',
    });
  }
};

export const deleteUserRequestHandler = async (
  _: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!validateUuid(id)) {
    prepareResponseData(res, 400, {
      status: 400,
      message: 'Invalid User ID format',
    });
    return;
  }

  try {
    const isUserDeleted = await deleteUserById(id);
    if (!isUserDeleted) {
      return prepareResponseData(res, 404, {
        status: 404,
        message: 'User not found.',
      });
    }

    res.writeHead(204).end();
  } catch (error) {
    console.error(error);
    prepareResponseData(res, 500, {
      status: 500,
      message: 'Oops! Server error.',
    });
  }
};

export const updateUserRequestHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!validateUuid(id)) {
    prepareResponseData(res, 400, {
      status: 400,
      message: 'Invalid User ID format',
    });
    return;
  }

  try {
    const userData = await getDataFromRequest(req);

    const userInfo = await updateUserById(userData, id);

    if (!userInfo) {
      return prepareResponseData(res, 404, {
        status: 404,
        message: 'User not found',
      });
    }

    prepareResponseData(res, 200, userInfo);
  } catch (error) {
    console.error(error);
    prepareResponseData(res, 500, {
      status: 500,
      message: 'Oops! Server error.',
    });
  }
};
