import { config } from 'dotenv';
import { createServer } from 'http';
import { handleAllRequest } from './handlers/handle-all-requests';

config();

const serverPort = process.env.APP_PORT || 8080;

export const server = createServer(handleAllRequest);

server.listen(serverPort, () => {
  console.log(`Server is listen on the PORT: ${serverPort}`);
});
