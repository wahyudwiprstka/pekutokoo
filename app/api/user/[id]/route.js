import { PrismaClient } from "@prisma/client";
import makeid from "@/lib/generateTempPassword";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const id = params.id;
  try {
    const data = await req.json();
    data.status = parseInt(data.status);
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        status: data.status,
        role: data.role,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message);
  }
}

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const res = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
