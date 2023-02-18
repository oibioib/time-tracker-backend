import {
  clientControllers,
  projectControllers,
  timersControllers,
  userControllers,
} from '../controllers';
import setServiceUnavailable from '../helpers/expressHelpers';

const getUsers = [
  {
    request: '/users',
    controller: userControllers.getUsers,
  },
  {
    request: '/users/:uuid',
    controller: userControllers.getUser,
  },
];

const getProjects = [
  {
    request: '/projects',
    controller: setServiceUnavailable,
  },
  {
    request: '/projects/:uuid',
    controller: setServiceUnavailable,
  },
];

const getTimers = [
  {
    request: '/timers',
    controller: setServiceUnavailable,
  },
  {
    request: '/timers/:uuid',
    controller: setServiceUnavailable,
  },
];

const getUserProjects = [
  {
    request: '/userprojects',
    controller: setServiceUnavailable,
  },

  {
    request: '/userprojects/:uuid',
    controller: projectControllers.getUserProjects,
  },
];

const getUserTimers = [
  {
    request: '/usertimers',
    controller: setServiceUnavailable,
  },
  {
    request: '/usertimers/:uuid',
    controller: timersControllers.getUserTimers,
  },
];

const getUserClients = [
  {
    request: '/userclients',
    controller: setServiceUnavailable,
  },
  {
    request: '/userclients/:uuid',
    controller: clientControllers.getUserClients,
  },
];
const getUserTimersTimeByDay = [
  {
    request: '/usertimerstime',
    controller: setServiceUnavailable,
  },
  {
    request: '/usertimerstime/:uuid',
    controller: timersControllers.getUserTimersTotalTimeByDay,
  },
];

const getRequests = [
  ...getUsers,
  ...getProjects,
  ...getTimers,
  ...getUserProjects,
  ...getUserTimers,
  ...getUserClients,
  ...getUserTimersTimeByDay,
];

export default getRequests;
