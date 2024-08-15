import { PrismaClient } from "@prisma/client";
import makeid from "@/lib/generateTempPassword";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, identity_number, role } = await req.json();
    const password = makeid(10);
    const res = await prisma.user.create({
      data: {
        name,
        email,
        identity_number,
        role,
        status: 1,
        temp_password: password,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message);
  }
}

export async function GET(req) {
  try {
    const res = await prisma.user.findMany();
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
