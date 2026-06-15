// ─── Types ───────────────────────────────────────────────────────────────────

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

export type ShopifyVariant = {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
};

export type LaunchItem = {
  id: string;
  handle: string;
  title: string;
  createdAt: string;
  featuredImage: ShopifyImage | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  priceRange: { minVariantPrice: ShopifyMoney };
  options: ShopifyProductOption[];
  variants: ShopifyVariant[];
};

// ─── Config ──────────────────────────────────────────────────────────────────

const API_VERSION = "2024-10";

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
}

// ─── GraphQL client ───────────────────────────────────────────────────────────

type ShopifyFetchResult<T> = { data: T; errors?: { message: string }[] };

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      "Shopify não configurado. Adiciona NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN e " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ao ficheiro .env.local",
    );
  }

  const res = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`Shopify API: ${res.status} ${res.statusText}`);

  const json: ShopifyFetchResult<T> = await res.json();
  if (json.errors?.length)
    throw new Error(json.errors.map((e) => e.message).join(", "));

  return json.data;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getProducts(first = 24): Promise<ShopifyProduct[]> {
  type Raw = { products: { edges: { node: RawProduct }[] } };

  const data = await shopifyFetch<Raw>(
    `query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }`,
    { first },
  );

  return data.products.edges.map(({ node }) => normalizeProduct(node));
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  type Raw = { product: (RawProduct & { images: { edges: { node: ShopifyImage }[] } }) | null };

  const data = await shopifyFetch<Raw>(
    `query GetProduct($handle: String!) {
      product(handle: $handle) {
        ${PRODUCT_FIELDS}
        images(first: 10) { edges { node { url altText } } }
      }
    }`,
    { handle },
  );

  if (!data.product) return null;

  const raw = data.product;
  return {
    ...normalizeProduct(raw),
    images: raw.images.edges.map(({ node }) => node),
  };
}

export async function getLaunches(first = 12): Promise<LaunchItem[]> {
  type Raw = { products: { edges: { node: { id: string; handle: string; title: string; createdAt: string; featuredImage: ShopifyImage | null } }[] } };

  const data = await shopifyFetch<Raw>(
    `query GetLaunches($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges { node {
          id handle title createdAt
          featuredImage { url altText }
        } }
      }
    }`,
    { first },
  );

  return data.products.edges.map(({ node }) => node);
}

export async function createCart(variantId: string, quantity = 1): Promise<string> {
  type Raw = { cartCreate: { cart: { checkoutUrl: string } } };

  const data = await shopifyFetch<Raw>(
    `mutation CartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
        cart { checkoutUrl }
      }
    }`,
    { variantId, quantity },
  );

  return data.cartCreate.cart.checkoutUrl;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

type RawVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
};

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  options: ShopifyProductOption[];
  variants: { edges: { node: RawVariantNode }[] };
};

const PRODUCT_FIELDS = `
  id handle title description vendor
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  options { name values }
  variants(first: 100) {
    edges { node {
      id title availableForSale
      price { amount currencyCode }
      selectedOptions { name value }
      image { url altText }
    } }
  }
`;

function normalizeProduct(raw: RawProduct): ShopifyProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    vendor: raw.vendor ?? "",
    featuredImage: raw.featuredImage ?? null,
    images: raw.featuredImage ? [raw.featuredImage] : [],
    priceRange: raw.priceRange,
    options: raw.options ?? [],
    variants: raw.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      price: node.price,
      availableForSale: node.availableForSale,
      selectedOptions: node.selectedOptions ?? [],
      image: node.image ?? null,
    })),
  };
}

export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
