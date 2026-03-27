import { Hono } from 'hono'
import { getPrisma } from "../lib/prisma"
import { fromBase64, generateSalt, hashPassword, toBase64 } from '../lib/password'
import { sign,verify } from 'hono/jwt'
import { signinInput,signupInput } from 'pallavi-common'



export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string,
    PRISMA_ACCELERATE_URL: string,
  },
  Variables:{
    userId:string
  }
}>();



userRouter.post('/signup', async (c) => {
  
  const  body =await c.req.json();
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL)

  const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

  const existing=await prisma.user.findUnique({
      where:{email:body.email}
    })

    if(existing){
      return c.json({error:"user already exists"},409)
    }
    const salt=generateSalt()
  const hash=await hashPassword(body.password,salt)
  
    const user=await prisma.user.create({
      
      data:{
        email:body.email,
        name:body.name,
        passwordHash:toBase64(hash),
        passwordSalt:toBase64(salt),
      },
    });

    
    const token=await sign({id:user.id},c.env.JWT_SECRET,"HS256")
    return c.json({
      msg:"signup successful",
      token})
    
});

userRouter.post('/signin', async (c) => {
  const body =await c.req.json();
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL)

  const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
  const user=await prisma.user.findUnique({
    where:{ email:body.email }
  })
  if(!user){
    return c.json({error:"invalid credentials"},401)
  }

  const salt=fromBase64(user.passwordSalt)

  const incomingHash=await hashPassword(body.password,salt)

  const storedHash=fromBase64(user.passwordHash)

  if(
    toBase64(incomingHash)!==toBase64(storedHash)
  ){
    return c.json({error:"invalid cred"},401)
  }

  const token=await sign({id:user.id },c.env.JWT_SECRET,"HS256");
  return c.json({token,
    msg:"signin successful"
  })


});