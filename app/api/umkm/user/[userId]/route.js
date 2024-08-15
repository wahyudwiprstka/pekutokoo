import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.userId;
  try {
    const res = await prisma.uMKM.findUnique({
      where: {
        id_user: id,
      },
      include: {
        user: true,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
