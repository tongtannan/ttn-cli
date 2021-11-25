export const isDev = process.env.NODE_ENV === 'development';
export const DATABASE_URI = 'mongodb://localhost:27019';
export const DATABASE_NAME = 'monitor';

export const PORT = isDev ? 3000 : 3000;
export const HOST = isDev ? 'localhost' : '';
export const ORIGIN = '*';
export const LIMIT = 10;

export enum APIRouter {
  LOG = '/log',
}
