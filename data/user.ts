import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
};

// export const getUserId = async (): Promise<string> => {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) {
//     throw new Error("Sign in");
//   }

//   return userId;
// };
