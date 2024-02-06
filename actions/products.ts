import { db } from "@/lib/db";

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
      },
    });
    if (!products) {
      throw new Error("No products found");
    }
    // console.log("products in getProducts", products);
    return products;
  } catch (error: any) {
    throw new Error("Failed to fetch posts: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await db.$disconnect();
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
      },
    });
    if (!product) {
      throw new Error("No product");
    }
    return product;
  } catch (error: any) {
    throw new Error("Failed to fetch posts: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await db.$disconnect();
  }
}
