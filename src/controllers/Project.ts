import { Request, Response } from 'express';
import { Equal } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

import dataSource from '../data-source/data-source';
import { Project, Timer, User } from '../entity';

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

  const userProjects = await dataSource.manager.find(Project, {
    where: {
      user: Equal(requestUserId),
    },
    order: {
      created_at: 'DESC',
    },
  });

  if (userProjects) {
    type UserProject = {
      id: string;
      totalTime: number;
      totalTimers: number;
    };

    const userProjectsWithTotalTime: UserProject[] = await dataSource
      .createQueryBuilder(Timer, 'timer')
      .leftJoinAndSelect('timer.project', 'project')
      .select('SUM(timer.totalTime)', 'totalTime')
      .addSelect('COUNT(timer.id)', 'totalTimers')
      .addSelect('project.id', 'id')
      .addGroupBy('project.id')
      .where('timer.userId = :user', { user: requestUserId })
      .getRawMany();

    const response = userProjects.map(({ id, title, color, salary }) => {
      const projectWithTotalTime = userProjectsWithTotalTime.filter(
        ({ id: idWithTotalTime }) => id === idWithTotalTime
      );

      return {
        id,
        title,
        color,
        salary,
        totalTime: projectWithTotalTime.length
          ? +projectWithTotalTime[0].totalTime
          : 0,
        totalTimers: projectWithTotalTime.length
          ? +projectWithTotalTime[0].totalTimers
          : 0,
      };
    });

    res.status(200).json(response);
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
  const requestSalary = req.body.salary || 0;
  const requestColor = req.body.color || '#ffffff';

  if (!requestUserId) {
    res.status(400).send('No user id');
    return;
  }

  const user = await dataSource.manager.findOneBy(User, { id: requestUserId });

  if (user) {
    const newProject = new Project();
    newProject.user = user;
    newProject.title = requestTitle;
    newProject.color = requestColor;
    newProject.salary = requestSalary;
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

const updateUserProject = async (req: Request, res: Response) => {
  const requestProjectId = req.params.uuid;

  if (!uuidValidate(requestProjectId)) {
    res.status(400).send('Invalid project id');
    return;
  }

  const project = await dataSource.manager.findOneBy(Project, {
    id: requestProjectId,
  });

  if (!project) {
    res.status(404).send('Project not found');
    return;
  }

  const requestBodyParams = [req.body.title, req.body.salary, req.body.color];

  const requestBodyParamsFiltered = requestBodyParams.filter(
    (requestBodyParam) => requestBodyParam !== undefined
  );

  if (!requestBodyParamsFiltered.length) {
    res.status(400).send('No request body parameters');
    return;
  }

  project.title = req.body.title || project.title;
  project.color = req.body.color || project.color;
  project.salary = +req.body.salary || project.salary;

  const resultProject = await dataSource.manager.save(project);
  res.status(200).send(resultProject);
};

export {
  getUserProjects,
  getProject,
  addUserProject,
  deleteProject,
  updateUserProject,
};
