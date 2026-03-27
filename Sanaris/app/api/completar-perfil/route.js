import { NextResponse } from "next/server";

async function getManagementToken() {
  const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_M2M_CLIENT_ID,
      client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req) {
  const { userId, form, state } = await req.json();
  
  console.log("userId:", userId);
  console.log("state:", state);
  console.log("continueUrl:", `https://${process.env.AUTH0_DOMAIN}/continue?state=${state}`);

  try {
    const token = await getManagementToken();

    await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_metadata: {
          perfil_completo: true,
          tipoDoc: form.tipoDoc,
          numeroDoc: form.numeroDoc,
          rol: form.rol,
        },
      }),
    });

    const continueUrl = `https://${process.env.AUTH0_DOMAIN}/continue?state=${state}`;
    return NextResponse.json({ continueUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error actualizando perfil" }, { status: 500 });
  }
}