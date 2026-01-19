import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import { verify } from 'hono/jwt'
import { createPostInput,updatePostInput } from 'pallavi-common'

export const blogRouter = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

// 🔐 protect all blog routes
blogRouter.use('/*', async (c, next) => {
  const auth = c.req.header('Authorization')
  if (!auth) return c.json({ error: 'unauthorized' }, 401)

  const token = auth.split(' ')[1]
  const payload = await verify(token, c.env.JWT_SECRET, 'HS256') as { id: string }

  c.set('userId', payload.id)
  await next()
})

// CREATE BLOG
blogRouter.post('/', async (c) => {
  const body = await c.req.json()
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL)

  const { success }=createPostInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({error:"invalid input"

    });
  }
  const post = await prisma.post.create({
    data: {
      title:body.title,
      content:body.content,
      authorId: c.get('userId')
    }
  })

  return c.json(post)
})

// UPDATE BLOG (only own post)
blogRouter.put('/', async (c) => {
  const body = await c.req.json()
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL)
  
  const { success }=updatePostInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({error:"invalid input"})
  }

  const post = await prisma.post.findFirst({
    where: {
      id:body.id,
      authorId: c.get('userId')
    }
  })

  if (!post) return c.json({ error: 'not allowed' }, 403)

  const updated = await prisma.post.update({
    where: { id:body.id },
    data: { title:body.title, content:body.content }
  })

  return c.json(updated)
})

// GET BLOG BY ID
blogRouter.get('/:id', async (c) => {
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL)

  const post = await prisma.post.findUnique({
    where: { id: c.req.param('id') }
  })

  return c.json(post)
})
