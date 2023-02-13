import { Request, Response } from 'express';
import { Equal } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { Client, User } from '../entity';

const getUserClients = async (req: Request, res: Response) => {
  const requestUserId = req.params.uuid;

  if (!requestUserId) {
    res.status(400).send('No user id');
    return;
  }

  if (!uuidValidate(requestUserId)) {
    res.status(400).send('Invalid user id');
    return;
  }

  const userClients = await dataSource.manager.findBy(Client, {
    user: Equal(requestUserId),
  });

  if (userClients) {
    res.status(200).json(userClients);
  } else {
    res.status(404).send('User clients not founded');
  }
};

const addUserClient = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send('No request body');
    return;
  }

  const requestUserId = req.body.userId;
  const requestTitle = req.body.title || '';

  if (!requestUserId) {
    res.status(400).send('No client id');
    return;
  }

  const user = await dataSource.manager.findOneBy(User, { id: requestUserId });

  if (user) {
    const newClient = new Client();
    newClient.user = user;
    newClient.title = requestTitle;
    const resultNewClient = await dataSource.manager.save(newClient);
    res.status(201).json(resultNewClient);
  } else {
    res.status(400).send('No such user');
  }
};

const deleteClient = async (req: Request, res: Response) => {
  const requestClientId = req.params.uuid;

  if (!uuidValidate(requestClientId)) {
    res.status(400).send('Invalid client id');
    return;
  }

  const resultClient = await dataSource.manager.delete(Client, requestClientId);
  if (resultClient.affected) {
    res.status(200).send('Client deleted');
  } else {
    res.status(404).send('Client not found');
  }
};

export { getUserClients, addUserClient, deleteClient };
