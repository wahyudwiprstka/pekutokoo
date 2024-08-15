import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const res = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const id = params.id;
  const { category_name } = await req.json();
  try {
    const res = await prisma.category.update({
      where: {
        id,
      },
      data: {
        category_name,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
