import { Request, Response } from 'express';
import { Equal } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { Project } from '../entity';

const getUserProjects = async (req: Request, res: Response) => {
  const userId = req.params.uuid;

  if (!uuidValidate(userId)) {
    res.status(400).send('Invalid user id');
    return;
  }

  const userProjects = await dataSource.manager.findBy(Project, {
    user: Equal(userId),
  });

  if (userProjects) {
    res.status(200).json(userProjects);
  } else {
    res.status(404).send('User projects not founded');
  }
};

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

export { getUserProjects, getProject };
