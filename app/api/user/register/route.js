import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, identity_number, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const getUserByNIK = await prisma.user.findUnique({
      where: {
        identity_number,
      },
    });
    const getUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (getUserByNIK) {
      return Response.json("NIK telah digunakan", { status: 500 });
    }
    if (getUserByEmail) {
      return Response.json("Email telah digunakan", { status: 500 });
    }
    const res = await prisma.user.create({
      data: {
        name,
        email,
        identity_number,
        password: hashedPassword,
        status: 1,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
