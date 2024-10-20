import { sayHi } from './utils/say-hi';
import { config } from 'dotenv';

config();
sayHi();
console.log(process.env.NODE_ENV);
