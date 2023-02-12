import { NextFunction, Request, Response } from 'express';

export const defaultErrorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send('Ups! Something broke.');
};

const setServiceUnavailable = async (req: Request, res: Response) => {
  res.status(503).send('Service Unavailable');
};

export default setServiceUnavailable;
