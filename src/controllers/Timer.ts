import { Request, Response } from 'express';
import { Between } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { Project, Timer, User } from '../entity';

const addTimer = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send('No request body');
    return;
  }

  const requestUserId = req.body.userId;
  const requestTitle = req.body.title || '';
  const requestStartTime = req.body.startTime || Date.now().toString();
  const requestIsActive = req.body.isActive || 1;
  const requestProjectId = req.body.projectId;

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

    if (requestProjectId) {
      const project = await dataSource.manager.findOneBy(Project, {
        id: requestProjectId,
      });
      if (project) {
        newTimer.project = project;
      }
    }

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
    req.body.projectId,
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

  const requestProjectId = req.body.projectId;

  if (requestProjectId) {
    if (requestProjectId === 'null') {
      timer.project = null;
    } else {
      const project = await dataSource.manager.findOneBy(Project, {
        id: requestProjectId,
      });
      if (project) {
        timer.project = project;
      }
    }
  }

  const resultTimer = await dataSource.manager.save(timer);
  res.status(200).send(resultTimer);
};

const getUserTimers = async (req: Request, res: Response) => {
  const requestUserId = req.params.uuid;
  const requestQueryStatus = req.query.status;
  const requestQueryFrom = req.query.from ? +req.query.from : undefined;
  const requestQueryTo = req.query.to ? +req.query.to : Date.now();

  if (!uuidValidate(requestUserId)) {
    res.status(400).send('Invalid user id');
    return;
  }

  if (requestUserId) {
    const responseTimers = await dataSource.manager.find(Timer, {
      where: {
        user: {
          id: requestUserId,
        },
        isActive: requestQueryStatus === 'active' ? 1 : undefined,
        startTime: Between(requestQueryFrom || 1, requestQueryTo || Date.now()),
      },
      relations: {
        project: true,
      },
      order: {
        startTime: 'DESC',
      },
    });

    res.set('X-Total-timers', `${responseTimers ? responseTimers.length : 0}`);
    res.status(200).json(responseTimers);
  }
};

const getUserTimersTotalTimeByDay = async (req: Request, res: Response) => {
  const requestUserId = req.params.uuid;
  const requestQueryFrom = req.query.from;
  const requestQueryDays = req.query.days ? +req.query.days : 0;

  if (!uuidValidate(requestUserId)) {
    res.status(400).send('Invalid user id');
    return;
  }
  const user = await dataSource.manager.findOneBy(User, { id: requestUserId });

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  if (requestQueryFrom) {
    const responseData = await Promise.all(
      Array(requestQueryDays)
        .fill(0)
        .map(async (_days, index) => {
          const msInOneDay = 24 * 60 * 60 * 1000;
          const start = +requestQueryFrom + msInOneDay * index;
          const end = start + msInOneDay;

          const dayTimers = await dataSource
            .createQueryBuilder(Timer, 'timer')
            .select('SUM(timer.totalTime)', 'totalTime')
            .where('timer.userId = :user', { user: requestUserId })
            .andWhere('timer.startTime >= :timerFrom', { timerFrom: start })
            .andWhere('timer.startTime < :timerTo', { timerTo: end })
            .getRawMany();

          return {
            day: index,
            startTime: start,
            totalTime: Number(dayTimers[0].totalTime),
          };
        })
    );
    res.status(200).json(responseData);
  } else {
    res.status(400).send('Invalid request params');
  }
};

export {
  addTimer,
  deleteTimer,
  updateTimer,
  getUserTimers,
  getUserTimersTotalTimeByDay,
};
