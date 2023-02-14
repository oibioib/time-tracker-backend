import { Request, Response } from 'express';
import { Equal } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { Project, User } from '../entity';

const getUserProjects = async (req: Request, res: Response) => {
  const requestUserId = req.params.uuid;

  if (!requestUserId) {
    res.status(400).send('No user id');
    return;
  }

  if (!uuidValidate(requestUserId)) {
    res.status(400).send('Invalid user id');
    return;
  }

  const userProjects = await dataSource.manager.findBy(Project, {
    user: Equal(requestUserId),
  });

  if (userProjects) {
    res.status(200).json(userProjects);
  } else {
    res.status(404).send('User projects not founded');
  }
};

const addUserProject = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send('No request body');
    return;
  }

  const requestUserId = req.body.userId;
  const requestTitle = req.body.title || '';

  if (!requestUserId) {
    res.status(400).send('No user id');
    return;
  }

  const user = await dataSource.manager.findOneBy(User, { id: requestUserId });

  if (user) {
    const newProject = new Project();
    newProject.user = user;
    newProject.title = requestTitle;
    const resultNewProject = await dataSource.manager.save(newProject);
    res.status(201).json(resultNewProject);
  } else {
    res.status(400).send('No such user');
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const requestProjectId = req.params.uuid;

  if (!uuidValidate(requestProjectId)) {
    res.status(400).send('Invalid project id');
    return;
  }

  const resultTimer = await dataSource.manager.delete(
    Project,
    requestProjectId
  );
  if (resultTimer.affected) {
    res.status(200).send('Project deleted');
  } else {
    res.status(404).send('Project not found');
  }
};

// TODO remove if don't need
const getProject = async (req: Request, res: Response) => {
  const projectId = req.params.uuid;

  if (!uuidValidate(projectId)) {
    res.status(400).send('Invalid project id');
    return;
  }

  const project = await dataSource.manager.find(Project, {
    relations: {
      user: true,
    },
    where: {
      id: projectId,
    },
  });

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).send('Project not founded');
  }
};

export { getUserProjects, getProject, addUserProject, deleteProject };
