import makeid from "@/lib/generateTempPassword";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const res = await prisma.uMKM.findMany({
      include: {
        user: true,
      },
    });

    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  let temp_password = makeid(10);
  try {
    const data = await req.json();
    const res = await prisma.uMKM.create({
      data: {
        umkm_address: data.umkm_address,
        umkm_email: data.email,
        umkm_name: data.umkm_name,
        umkm_status: 1,
        wa_number: data.wa,
        user: {
          create: {
            name: data.name,
            email: data.email,
            identity_number: data.identity_number,
            role: "UMKM",
            status: 1,
            temp_password,
          },
        },
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
