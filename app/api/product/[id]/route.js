import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const res = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        satuan: true,
        umkm: true,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const res = await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const id = params.id;
  try {
    const data = await req.json();
    data.price_per_satuan = parseInt(data.price_per_satuan);
    data.price = parseInt(data.price);
    const res = await prisma.product.update({
      where: {
        id,
      },
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
    return Response.json(error.message, { status: 500 });
  }
}
