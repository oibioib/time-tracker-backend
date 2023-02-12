import { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { Timer, User } from '../entity';

const addTimer = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send('No request body');
    return;
  }

  const requestUserId = req.body.userId;
  const requestTitle = req.body.title || '';
  const requestStartTime = req.body.startTime || Date.now().toString();
  const requestIsActive = req.body.isActive || 1;

  if (!requestUserId) {
    res.status(400).send('No user id');
    return;
  }

  const user = await dataSource.manager.findOneBy(User, { id: requestUserId });

  if (user) {
    const newTimer = new Timer();
    newTimer.user = user;
    newTimer.title = requestTitle;
    newTimer.startTime = requestStartTime;
    newTimer.isActive = requestIsActive === 1 ? 1 : 0;
    const resultNewTimer = await dataSource.manager.save(newTimer);
    res.status(201).json(resultNewTimer);
  } else {
    res.status(400).send('No such user');
  }
};

const deleteTimer = async (req: Request, res: Response) => {
  const requestTimerId = req.params.uuid;

  if (!uuidValidate(requestTimerId)) {
    res.status(400).send('Invalid timer id');
    return;
  }

  const resultTimer = await dataSource.manager.delete(Timer, requestTimerId);
  if (resultTimer.affected) {
    res.status(200).send('Deleted');
  } else {
    res.status(404).send('Timer not found');
  }
};

const updateTimer = async (req: Request, res: Response) => {
  const requestTimerId = req.params.uuid;

  if (!uuidValidate(requestTimerId)) {
    res.status(400).send('Invalid timer id');
    return;
  }

  const timer = await dataSource.manager.findOneBy(Timer, {
    id: requestTimerId,
  });

  if (!timer) {
    res.status(404).send('Timer not found');
    return;
  }

  const requestBodyParams = [
    req.body.title,
    req.body.totalTime,
    req.body.isActive,
  ];
  const requestBodyParamsFiltered = requestBodyParams.filter(
    (requestBodyParam) => requestBodyParam !== undefined
  );

  if (!requestBodyParamsFiltered.length) {
    res.status(400).send('No request body parameters');
    return;
  }

  const requestIsActive = req.body.isActive;

  switch (requestIsActive) {
    case 0:
    case 1:
      timer.isActive = requestIsActive;
      break;
    default:
      timer.isActive = 0;
      break;
  }

  timer.title = req.body.title || timer.title;
  timer.totalTime = req.body.totalTime || timer.totalTime;

  const resultTimer = await dataSource.manager.save(timer);
  res.status(200).send(resultTimer);
};

const getUserTimers = async (req: Request, res: Response) => {
  const requestUserId = req.params.uuid;
  const requestQueryStatus = req.query.status;

  if (!uuidValidate(requestUserId)) {
    res.status(400).send('Invalid user id');
    return;
  }
  const user = await dataSource.manager.findOneBy(User, { id: requestUserId });

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  const responseTimers: Timer[] = [];

  if (requestQueryStatus !== 'active') {
    const userTimers = await dataSource.manager.find(Timer, {
      where: {
        user,
      },
      order: {
        startTime: 'DESC',
      },
    });
    if (userTimers.length) {
      responseTimers.push(...userTimers);
    }
  } else {
    const userActiveTimers = await dataSource.manager.find(Timer, {
      where: {
        user,
        isActive: 1,
      },
    });
    responseTimers.push(...userActiveTimers);
  }

  res.set('X-Total-timers', `${responseTimers.length}`);
  res.status(200).json(responseTimers);
};

export { addTimer, deleteTimer, updateTimer, getUserTimers };
