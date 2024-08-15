import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const res = await prisma.category.findMany();
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { category_name } = await req.json();
    const res = await prisma.category.create({
      data: {
        category_name,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
