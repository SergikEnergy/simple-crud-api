import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { prepareResponseData } from './prepare-response-data';
import { RESPONSE_MESSAGES } from '../constants/response-messages';

export const setResponseNotUuidFormat = (res: ServerResponse, id: string) => {
  if (validate(id)) return true;

  prepareResponseData(res, 400, {
    status: 400,
    message: RESPONSE_MESSAGES.invalidId,
  });

  return false;
};
