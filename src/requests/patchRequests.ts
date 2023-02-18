import { projectControllers, timersControllers } from '../controllers';

const patchRequests = [
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
