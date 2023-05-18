import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prismadb = client;

export default client;

async function main() {
  // await prismadb.user.create({
  //   data: {
  //     name: 'Rich',
  //     email: 'hello@prisma.com',

  //   },
  // })

  const allUsers = await prismadb.user.findMany({});
  console.dir(allUsers, { depth: null });
}
