import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const res = await prisma.product.findMany({
      where: {
        id_category: id,
      },
      include: {
        satuan: true,
        category: true,
        umkm: true,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
