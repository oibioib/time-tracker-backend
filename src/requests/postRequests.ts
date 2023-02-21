import {
  projectControllers,
  timersControllers,
  userControllers,
} from '../controllers';

const postRequests = [
  {
    request: '/users',
    controller: userControllers.addUser,
  },
  {
    request: '/timers',
    controller: timersControllers.addTimer,
  },
  {
    request: '/userprojects',
    controller: projectControllers.addUserProject,
  },
];

export default postRequests;
