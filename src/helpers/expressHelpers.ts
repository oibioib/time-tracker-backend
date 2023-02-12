import { Request, Response } from 'express';

const setServiceUnavailable = async (req: Request, res: Response) => {
  res.status(503).send('Service Unavailable');
};

export default setServiceUnavailable;
