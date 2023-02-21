import { projectControllers, timersControllers } from '../controllers';

const deleteRequests = [
  {
    request: '/timers/:uuid',
    controller: timersControllers.deleteTimer,
  },
  {
    request: '/userprojects/:uuid',
    controller: projectControllers.deleteProject,
  },
];

export default deleteRequests;
