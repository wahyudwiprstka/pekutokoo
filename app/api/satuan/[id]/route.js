import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const res = await prisma.satuan.findUnique({
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
  try {
    const { name } = await req.json();
    const id = params.id;
    const res = await prisma.satuan.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    const res = await prisma.satuan.delete({
      where: {
        id,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
