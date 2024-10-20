import { ServerResponse } from 'http';

export const prepareResponseData = (
  res: ServerResponse,
  status: number,
  data: unknown,
) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  const dataStringified = JSON.stringify(data);
  res.end(dataStringified);
};
