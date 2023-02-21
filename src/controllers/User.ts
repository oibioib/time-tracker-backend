import { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { User } from '../entity';

const getUsers = async (req: Request, res: Response) => {
  const users = await dataSource.manager.find(User);
  res.set('X-Total-users', `${users.length}`);
  res.json(users);
};

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.uuid;

  if (!uuidValidate(userId)) {
    res.status(400).send('Invalid user id');
    return;
  }
  const user = await dataSource.manager.findOneBy(User, { id: userId });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('Not found');
  }
};

const addUser = async (req: Request, res: Response) => {
  const requestGithubID = +req.body.githubId;
  const requestGithubName = req.body.githubName.trim();

  const githubUser = await dataSource.manager.findOneBy(User, {
    githubId: requestGithubID,
  });

  if (githubUser) {
    res.status(200).json(githubUser);
  } else {
    const newUser = new User();
    newUser.githubId = requestGithubID;
    newUser.githubName = requestGithubName;
    const user = await dataSource.manager.save(newUser);
    res.status(201).send(user);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const requestUserId = req.params.uuid;

  if (!uuidValidate(requestUserId)) {
    res.status(400).send('Invalid user id');
    return;
  }

  const requestUser = await dataSource.manager.findOneBy(User, {
    id: requestUserId,
  });

  if (!requestUser) {
    res.status(400).send('User not found');
    return;
  }

  const requestBodyParams = [req.body.name];

  const requestBodyParamsFiltered = requestBodyParams.filter(
    (requestBodyParam) => requestBodyParam !== undefined
  );

  if (!requestBodyParamsFiltered.length) {
    res.status(400).send('No request body parameters');
    return;
  }

  requestUser.name = req.body.name;
  const responseUser = await dataSource.manager.save(requestUser);
  res.status(200).send(responseUser);
};

export { getUsers, getUser, addUser, updateUser };
