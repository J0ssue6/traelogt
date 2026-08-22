import { supabase } from "@/lib/supabase";

import type {
  Product,
  ProductImage,
  ProductVariant,
} from "@/features/products/types";

import type { Category } from "@/features/categories/types";

const PAGE_SIZE = 20;

export type StorefrontProduct = Product & {
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type StorefrontProductList = {
  products: StorefrontProduct[];
  total: number;
};

export async function getStorefrontProducts(
  search = "",
  page = 1,
  categorySlug = "",
): Promise<StorefrontProductList> {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const trimmedSearch = search.trim();
  const trimmedCategory = categorySlug.trim();

  /*
   * Resolve the explicit category filter first.
   */
  let categoryId: string | null = null;

  if (trimmedCategory) {
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", trimmedCategory)
      .eq("active", true)
      .maybeSingle();

    if (categoryError) {
      throw new Error("Unable to load category.");
    }

    categoryId = category?.id ?? null;
  }

  /*
   * If searching, find categories whose names match the search.
   *
   * This allows:
   *
   * search=apparel
   *
   * to find products belonging to the Apparel category even if
   * "apparel" isn't part of the product name.
   */
  let matchingCategoryIds: string[] = [];

  if (trimmedSearch) {
    const { data: matchingCategories, error: categoriesSearchError } =
      await supabase
        .from("categories")
        .select("id")
        .eq("active", true)
        .ilike("name", `%${trimmedSearch}%`);

    if (categoriesSearchError) {
      throw new Error("Unable to search categories.");
    }

    matchingCategoryIds = (matchingCategories ?? []).map(
      (category) => category.id,
    );
  }

  /*
   * Build the product query.
   */
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("active", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  /*
   * Explicit category filter.
   */
  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  /*
   * Marketplace search.
   *
   * Search product name OR description OR matching category.
   *
   * If an explicit category is already selected, the category part
   * is unnecessary because the query is already restricted to it.
   */
  if (trimmedSearch) {
    const searchConditions = [
      `name.ilike.%${trimmedSearch}%`,
      `description.ilike.%${trimmedSearch}%`,
    ];

    if (!categoryId && matchingCategoryIds.length > 0) {
      searchConditions.push(
        `category_id.in.(${matchingCategoryIds.join(",")})`,
      );
    }

    query = query.or(searchConditions.join(","));
  }

  const { data: productsData, error: productsError, count } = await query;

  if (productsError) {
    throw new Error("Unable to load products.");
  }

  const products = (productsData ?? []) as Product[];

  if (products.length === 0) {
    return {
      products: [],
      total: count ?? 0,
    };
  }

  const productIds = products.map((product) => product.id);

  /*
   * Load variants and images for the products on this page.
   */
  const [
    { data: variantsData, error: variantsError },
    { data: imagesData, error: imagesError },
  ] = await Promise.all([
    supabase
      .from("product_variants")
      .select("*")
      .in("product_id", productIds)
      .eq("active", true)
      .order("created_at", { ascending: true }),

    supabase
      .from("product_images")
      .select("*")
      .in("product_id", productIds)
      .order("sort_order", { ascending: true }),
  ]);

  if (variantsError) {
    throw new Error("Unable to load product variants.");
  }

  if (imagesError) {
    throw new Error("Unable to load product images.");
  }

  const variants = (variantsData ?? []) as ProductVariant[];
  const images = (imagesData ?? []) as ProductImage[];

  /*
   * Load categories for the products.
   */
  const categoryIds = [
    ...new Set(
      products
        .map((product) => product.category_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  let categories: Category[] = [];

  if (categoryIds.length > 0) {
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .in("id", categoryIds);

    if (categoriesError) {
      throw new Error("Unable to load product categories.");
    }

    categories = (categoriesData ?? []) as Category[];
  }

  const categoryMap = new Map(
    categories.map((category) => [category.id, category]),
  );

  /*
   * Group variants and images by product.
   */
  const variantsMap = new Map<string, ProductVariant[]>();
  const imagesMap = new Map<string, ProductImage[]>();

  for (const variant of variants) {
    const existing = variantsMap.get(variant.product_id) ?? [];

    existing.push(variant);
    variantsMap.set(variant.product_id, existing);
  }

  for (const image of images) {
    const existing = imagesMap.get(image.product_id) ?? [];

    existing.push(image);
    imagesMap.set(image.product_id, existing);
  }

  return {
    products: products.map((product) => ({
      ...product,
      category: product.category_id
        ? (categoryMap.get(product.category_id) ?? null)
        : null,
      variants: variantsMap.get(product.id) ?? [],
      images: imagesMap.get(product.id) ?? [],
    })),
    total: count ?? 0,
  };
}

export async function getStorefrontProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (productError) {
    throw new Error("Unable to load product.");
  }

  if (!productData) {
    return null;
  }

  const product = productData as Product;

  const [
    { data: variantsData, error: variantsError },
    { data: imagesData, error: imagesError },
  ] = await Promise.all([
    supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", product.id)
      .eq("active", true)
      .order("created_at", { ascending: true }),

    supabase
      .from("product_images")
      .select("*")
      .eq("product_id", product.id)
      .order("sort_order", { ascending: true }),
  ]);

  if (variantsError) {
    throw new Error("Unable to load product variants.");
  }

  if (imagesError) {
    throw new Error("Unable to load product images.");
  }

  let category: Category | null = null;

  if (product.category_id) {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", product.category_id)
      .maybeSingle();

    if (categoryError) {
      throw new Error("Unable to load product category.");
    }

    category = categoryData as Category | null;
  }

  return {
    ...product,
    category,
    variants: (variantsData ?? []) as ProductVariant[],
    images: (imagesData ?? []) as ProductImage[],
  };
}
