import { verify } from 'hono/jwt'

export const authMiddleware=async (c:any,next:any)=>{

  try{
  const auth = c.req.header('authorization')||
  c.req.header("Authorization")

  if (!auth) return c.json({ error: 'unauthorized' }, 401)

  const token = auth.split(' ')[1]

  const payload = await verify(token, c.env.JWT_SECRET,"HS256") as { id: string }

  c.set('userId', payload.id)
  await next()
} 
catch(err){
  return c.json({error:"invalid token"},401)
}
}
