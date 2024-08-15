import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const search = req.nextUrl.searchParams.get("search");
  const page = req.nextUrl.searchParams.get("page");
  let itemsPerPage = parseInt(req.nextUrl.searchParams.get("itemsPerPage"));
  let skip = 0;
  if (page) {
    skip = itemsPerPage * (page - 1);
  }
  try {
    const res = await prisma.product.findMany({
      include: {
        category: true,
        satuan: true,
        umkm: true,
      },
      ...(skip ? { skip } : undefined),
      ...(itemsPerPage ? { take: itemsPerPage } : undefined),
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    data.price_per_satuan = parseInt(data.price_per_satuan);
    data.price = parseInt(data.price);
    const res = await prisma.product.create({
      data: {
        id_umkm: data.umkm.id,
        id_category: data.category,
        id_satuan: data.satuan,
        product_name: data.product_name,
        description: data.description,
        price_per_satuan: data.price_per_satuan,
        price: data.price,
        product_status: 1,
        image_url: data.image_url,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
