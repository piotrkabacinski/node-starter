import { User } from "@prisma/client";
import { prismaQuery } from "..";

export const createUser = async (email: User["email"]) =>
  prismaQuery(
    async (prisma) =>
      await prisma.user.create({
        data: {
          email,
          created_at: new Date(),
        },
      })
  );

export const getUsers = async () =>
  prismaQuery(async (prisma) => await prisma.user.findMany());

export const getUserByEmail = async (email: User["email"]) =>
  prismaQuery(
    async (prisma) =>
      await prisma.user.findFirst({
        where: {
          email,
        },
      })
  );

export const getUserById = async (id: User["id"]) =>
  prismaQuery(
    async (prisma) =>
      await prisma.user.findFirst({
        where: {
          id,
        },
      })
  );

export const deleteUser = async (id: User["id"]) =>
  prismaQuery(
    async (prisma) =>
      await prisma.user.delete({
        where: {
          id,
        },
      })
  );
