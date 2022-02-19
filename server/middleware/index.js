import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

import getimage from './routes/getimage';

app.use(getimage);

export default app;
