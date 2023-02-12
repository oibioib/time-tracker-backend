import { magenta } from 'colors';
import cors from 'cors';
import express from 'express';
import path from 'path';

import { DEFAULT_PORT, ORIGIN_URLS } from './constants/constants';
import dataSource from './data-source/data-source';
import loggerRequest from './helpers/expressMiddlewares';
import {
  deleteRequests,
  getRequests,
  patchRequests,
  postRequests,
} from './requests';

const PORT = process.env.PORT ? +process.env.PORT : DEFAULT_PORT;

(async () => {
  try {
    await dataSource.initialize();

    const app = express();
    app.use(
      cors({
        origin: ORIGIN_URLS,
      })
    );
    app.use(loggerRequest);
    app.use(express.json());

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'static', 'index.html'));
    });

    app.get('*.md$', (req, res) => {
      res.sendFile(path.join(__dirname, 'static', 'docs', req.url));
    });

    const requests = [
      {
        requestsGroup: getRequests,
        expressMethod: app.get,
      },
      {
        requestsGroup: postRequests,
        expressMethod: app.post,
      },
      {
        requestsGroup: patchRequests,
        expressMethod: app.patch,
      },
      {
        requestsGroup: deleteRequests,
        expressMethod: app.delete,
      },
    ];

    requests.forEach(({ requestsGroup, expressMethod }) => {
      const bindRequest = expressMethod.bind(app);
      requestsGroup.forEach(({ request, controller }) => {
        bindRequest(request, controller);
      });
    });

    app.listen(PORT, () => {
      console.log(magenta(`Server starts on port ${PORT}`));
    });
  } catch (error) {
    console.error(error);
  }
})();
