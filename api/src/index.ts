import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, Router } from 'express';
import cors from 'cors';
import { startSubscriber } from './subscriber';
import { prisma } from './db';


const app: Express = express();
app.use(express.json({ limit: '10mb' }));
const port = process.env.PORT || 4000;
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const slugUrl = await prisma.slugUrl.findUnique({
    where: {
      slug,
    }
  })
  if (!slugUrl) {
    return res.sendStatus(404)
  }
  res.redirect(slugUrl.url)
})

app.get('/metadata/:tokenId', async (req: Request, res: Response) => {
  const tokenId = parseInt(req.params.tokenId);
  if (!Number.isInteger(tokenId)) {
    res.sendStatus(404)
  }
  const slugUrl = await prisma.slugUrl.findUnique({
    where: {
      tokenId,
    }
  })
  return res.json({
    name: `#${slugUrl?.tokenId} [${slugUrl?.slug}]`,
    slug: slugUrl?.slug,
    url: slugUrl?.url,
    image: 'https://shortzil.xyz/logo.png',
  })
})

const apiRouter = Router()

apiRouter.get('/users/:owner/links', async (req: Request, res: Response) => {
  const slugurls = await prisma.slugUrl.findMany({
    where: {
      owner: req.params.owner,
    },
    orderBy: {
      tokenId: 'asc',
    }
  })
  res.json({ data: slugurls })
})

apiRouter.get('/slug-availability/:slug', async (req: Request, res: Response) => {
  const slugUrl = await prisma.slugUrl.findUnique({
    where: {
      slug: req.params.slug,
    },
  })
  res.json({ available: !slugUrl })
})

app.use('/api', apiRouter)


startSubscriber()

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
