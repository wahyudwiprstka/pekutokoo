import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const id = params.id;
  try {
    const data = await req.json();
    data.password = await bcrypt.hash(data.password, 10);
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: data.password,
        temp_password: null,
      },
    });
    console.log(res);
    return Response.json(res, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return Response.json(error.message);
  }
}
