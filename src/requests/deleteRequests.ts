import { timersControllers } from '../controllers';

const deleteRequests = [
  {
    request: '/timers/:uuid',
    controller: timersControllers.deleteTimer,
  },
];

export default deleteRequests;
