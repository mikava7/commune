import { db } from "@/lib/db";

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!products) {
      throw new Error("No products found");
    }
    //     console.log("products in getProducts", products);
    return products;
  } catch (error: any) {
    throw new Error("Failed to fetch posts: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await db.$disconnect();
  }
}
