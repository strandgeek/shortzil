import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(express.json({ limit: '10mb' }));
const port = process.env.PORT || 4000;
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

const apiRouter = Router()

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
