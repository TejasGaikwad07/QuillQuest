import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { Hono } from "hono";

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookRouter.use("/blog/*", async (c, next) => {
  //console.log("inside middleware")
  const tokenString = c.req.header("Authorization");
  if (!tokenString || !tokenString.startsWith("Bearer ")) {
    return c.json({
      msg: "invalid token start",
    });
  }
  const validToken = tokenString.split(" ")[1];
  const payload = await verify(validToken, c.env.JWT_SECRET);

  if (!payload) {
    c.status(401);
    return c.json({
      error: "unauthorised",
    });
  }
  c.set("userId", payload.id);
  //console.log("after userId")
  await next();
});

bookRouter.post("/blog", async (c) => {
  // console.log("inside the function")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  //console.log("before the userId read")
  const userId = c.get("userId");
  //console.log(userId)

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({
    id: blog.id,
  });
});
bookRouter.put("blog", async (c) => {
    
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();

  const newBlog = prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    msg: "blog updated",
  });
});
bookRouter.get("/blog/:id", async (c) => {
  const id = c.req.param("id");

  console.log("inside getting blog request");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.req.json();
  console.log("before hitting result");
  const result = prisma.post.findFirst({
    where: {
      id,
    },
  });
  console.log(result);
  return c.json({
    result,
  });
});

bookRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = prisma.post.findMany();

  return c.json({
    blogs,
  });
});
