
import { Hono } from 'hono'
import { fromBase64, generateSalt, hashPassword, toBase64 } from './lib/password'
import { sign,verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from "hono/cors"
 const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();
app.use('/*',cors({
  origin:"http://localhost:5173",
  credentials:true
}) 
  
)
app.route('api/v1/user',userRouter)
app.route('api/v1/blogs',blogRouter)

export default app;


