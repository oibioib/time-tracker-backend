import { timersControllers, userControllers } from '../controllers';

const postRequests = [
  {
    request: '/users',
    controller: userControllers.addUser,
  },
  {
    request: '/timers',
    controller: timersControllers.addTimer,
  },
];

export default postRequests;
