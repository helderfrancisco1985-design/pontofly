import { NextRequest, NextResponse } from "next/server";

const API_VERSION = "2024-10";

export async function POST(req: NextRequest) {
  const body = await req.json() as { lines: { variantId: string; quantity: number }[] };

  if (!body.lines?.length) {
    return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
  }

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return NextResponse.json({ error: "Shopify não configurado." }, { status: 503 });
  }

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: `mutation CartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart { checkoutUrl }
          userErrors { message }
        }
      }`,
      variables: {
        lines: body.lines.map((l) => ({
          merchandiseId: l.variantId,
          quantity: l.quantity,
        })),
      },
    }),
  });

  const json = await res.json();
  const errors = json.data?.cartCreate?.userErrors;

  if (errors?.length) {
    return NextResponse.json({ error: errors[0].message }, { status: 400 });
  }

  const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    return NextResponse.json({ error: "Não foi possível obter o link de checkout." }, { status: 500 });
  }

  return NextResponse.json({ checkoutUrl });
}
