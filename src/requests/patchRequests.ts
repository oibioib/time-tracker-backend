import { timersControllers } from '../controllers';

const patchRequests = [
  {
    request: '/timers/:uuid',
    controller: timersControllers.updateTimer,
  },
];

export default patchRequests;
