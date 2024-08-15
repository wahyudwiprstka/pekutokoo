import { PrismaClient } from "@prisma/client";
import { URL } from "url";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const res = await prisma.satuan.findMany();
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();
    const res = await prisma.satuan.create({
      data: {
        name,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
