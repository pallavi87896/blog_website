import { Hono } from 'hono'
import { getPrisma } from '../lib/prisma'
import { verify } from 'hono/jwt'
import { createPostInput,updatePostInput } from 'pallavi-common'
import { Prisma } from "@prisma/client"
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
  try{
  const auth = c.req.header('authorization')||
  c.req.header("Authorization")
  if (!auth) return c.json({ error: 'unauthorized' }, 401)

  const token = auth.split(' ')[1]
  const payload = await verify(token, c.env.JWT_SECRET,"HS256") as { id: string }

  c.set('userId', payload.id)
  await next()
} catch(err){
  return c.json({error:"invalid token"},401)
}
})

// CREATE BLOG
blogRouter.post('/', async (c) => {
  try{
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

  return c.json({post})
}catch{
  return c.json({error:"error posting the blog"},403)
}
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

  return c.json({updated})
})

blogRouter.get('/bulk',async(c)=>{
  const prisma=getPrisma(c.env.PRISMA_ACCELERATE_URL);
  const search=c.req.query('search')||"";

  const posts=await prisma.post.findMany({
    where:{
      OR:[
        {
          title:{
            contains:search,
            mode:Prisma.QueryMode.insensitive
          },
        },
        {
          content:{
            contains:search,
            mode:Prisma.QueryMode.insensitive
          },
        },
      ],
    },
    select:{
      id:true,
      title:true,
      content:true,
      createdAt:true,
      updatedAt:true,
      authorId:true,
      _count:{
                  select:{likes:true}
                },
      author:{
        select:{
          name:true
        }
      }
    },
    orderBy:{
      createdAt:"desc"
    },
  })
  return c.json({posts});
  
})

blogRouter.get('/bookmarks', async (c) => {
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL);
  const userId = c.get("userId");

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    select: {
      post: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
           _count: {
        select: { likes: true }
      },
          author: {
            select: { name: true }
          }
        }
      }
    },
  });

  return c.json({ bookmarks });
});

blogRouter.post('/comment',async(c)=>{
  const prisma=getPrisma(c.env.PRISMA_ACCELERATE_URL);
  const body=await c.req.json();
  const comment = await prisma.comment.create({
    data: {
      postId: body.postId,
      content:body.content,
      userId:c.get("userId")
      
    }
  })
return c.json({ comment });
})

blogRouter.get('/:id/comments',async(c)=>{
  const prisma=getPrisma(c.env.PRISMA_ACCELERATE_URL);
const postId = c.req.param('id');
  const comments = await prisma.comment.findMany({
    where: { postId:postId },
            select: {
                id: true,
               
                content: true,
                userComment: {
        select: {
          name: true,
        },
      },
                
            }
  })

  return c.json({comments})

})


blogRouter.post('/:id/like',async (c)=>{
  const prisma=getPrisma(c.env.PRISMA_ACCELERATE_URL);
  const postId=c.req.param("id");
  const userId=c.get("userId");

  const existing=await prisma.like.findUnique({
    where:{
      userId_postId:{
        userId,
        postId
      }
    }
  });
  if(existing){
    await prisma.like.delete({
      where:{id:existing.id}
    });
    return c.json({liked:false})
  }
  await prisma.like.create({
    data:{
      userId,
      postId
    }
  });
  return c.json({liked:true})
})


blogRouter.post('/:id/bookmark',async (c)=>{
  const prisma=getPrisma(c.env.PRISMA_ACCELERATE_URL);
  const postId=c.req.param("id");
  const userId=c.get("userId");

  const existing=await prisma.bookmark.findUnique({
    where:{
      userId_postId:{
        userId,
        postId
      }
    }
  });
  if(existing){
    await prisma.bookmark.delete({
      where:{id:existing.id}
    });
    return c.json({bookmarked:false})
  }
  await prisma.bookmark.create({
    data:{
      userId,
      postId
    }
  });
  return c.json({bookmarked:true})
})




blogRouter.get('/:id', async (c) => {
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL)

  const post = await prisma.post.findUnique({
    where: { id: c.req.param('id') },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt:true,
                updatedAt:true,
                authorId:true,
                _count:{
                  select:{likes:true}
                },
                author: {
                    select: {
                        name: true
                    }
                }
            }
  })

  return c.json({post})
})

