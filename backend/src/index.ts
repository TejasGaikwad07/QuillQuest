import { Hono } from "hono";
import { userRouter } from "../routes/user"
import { bookRouter } from '../routes/blog'
// import { Bindings } from "hono/types";

 export const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
		JWT_SECRET: string,
  },
  Variables :{
    userId: string
  }
}>();

app.route('/api/v1/user',userRouter)
app.route('/api/v1/book',bookRouter)

export default app;
