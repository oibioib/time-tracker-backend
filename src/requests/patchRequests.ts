import {
  projectControllers,
  timersControllers,
  userControllers,
} from '../controllers';

const patchRequests = [
  {
    request: '/users/:uuid',
    controller: userControllers.updateUser,
  },
  {
    request: '/timers/:uuid',
    controller: timersControllers.updateTimer,
  },
  {
    request: '/userprojects/:uuid',
    controller: projectControllers.updateUserProject,
  },
];

export default patchRequests;
