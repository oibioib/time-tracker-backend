import { blue, magenta, red, white, yellow } from 'colors';
import { NextFunction, Request, Response } from 'express';

const loggerRequest = (req: Request, res: Response, next: NextFunction) => {
  const { protocol, originalUrl, method } = req;

  let methodColorized = '';

  switch (method) {
    case 'GET':
      methodColorized = blue(`[${method}]`);
      break;
    case 'POST':
      methodColorized = magenta(`[${method}]`);
      break;
    case 'DELETE':
      methodColorized = red(`[${method}]`);
      break;
    default:
      methodColorized = white(`[${method}]`);
  }
  const url = `${protocol}://${req.get('host')}${originalUrl}`;
  console.log(`${methodColorized} ${yellow(url)}`);
  next();
};

export default loggerRequest;
