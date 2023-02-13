import {
  clientControllers,
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
  {
    request: '/userclients',
    controller: clientControllers.addUserClient,
  },
];

export default postRequests;
