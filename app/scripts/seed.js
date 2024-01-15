const { PrismaClient } = require("@prisma/client");
const { books } = require("../app/lib/books.data.js");
const { members } = require("../app/lib/member.data.js");
const bcrypt = require("bcrypt");
import { db } from "@/lib/db";
const prisma = new PrismaClient();

const load = async () => {
  try {
    // Delete existing books to avoid duplicates in the database
    await db.user.deleteMany();
    // Create new members in the database using the data from the imported file
    const membersWithHashedPasswords = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10), // Hash password with bcrypt
    }));
    await db.member.createMany({
      data: membersWithHashedPasswords,
    });
    console.log("members are created");
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect the PrismaClient to release the database connection
    await db.$disconnect();
  }
};
load();

//**-------------------------------------------------------------- */
/*
const load = async () => {
  try {
    // Delete existing books to avoid duplicates in the database
    await prisma.book.deleteMany();
    // Create new books in the database using the data from the imported file

    await prisma.book.createMany({
      data: books,
    });
    console.log("Books are created");
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect the PrismaClient to release the database connection
    await prisma.$disconnect();
  }
};*/
