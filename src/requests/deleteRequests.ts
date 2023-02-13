import {
  clientControllers,
  projectControllers,
  timersControllers,
} from '../controllers';

const deleteRequests = [
  {
    request: '/timers/:uuid',
    controller: timersControllers.deleteTimer,
  },
  {
    request: '/userprojects/:uuid',
    controller: projectControllers.deleteProject,
  },
  {
    request: '/userclients/:uuid',
    controller: clientControllers.deleteClient,
  },
];

export default deleteRequests;
