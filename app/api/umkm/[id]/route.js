import makeid from "@/lib/generateTempPassword";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const res = await prisma.uMKM.findUnique({
      where: {
        id,
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

export async function PUT(req, { params }) {
  const id = params.id;

  try {
    const data = await req.json();
    data.status = parseInt(data.status);
    const res = await prisma.uMKM.update({
      where: {
        id,
      },
      data: {
        umkm_address: data.umkm_address,
        umkm_email: data.email,
        umkm_name: data.umkm_name,
        umkm_status: data.status,
        wa_number: data.wa,
      },
      include: {
        user: true,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
