'use server'

import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { signIn } from "next-auth/react";

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (user) {
        if (!user.verified) {
          throw new Error('Почта не подтверждена');
        }

        throw new Error('Пользователь с таким email уже зарегистрирован');
      }

      const createdUser = await prisma.user.create({
        data: {
          fullName: body.fullName,
          email: body.email,
          password: hashSync(body.password, 10),
          verified: new Date()
        },
      })

    } catch (error) {
        console.log('[RegisterUser] Server error', error);
        throw error
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
       const currentUser = await getUserSession();

       if (!currentUser) {
        throw new Error('User not found');
       }

       const findUser = await prisma.user.findFirst({
        where: {
          id: Number(currentUser.id),
        },
      });

       await prisma.user.update({
        where: {
            id: Number(currentUser.id)
        },
        
        data: {
           fullName: body.fullName,
           email: body.email,
           password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
        },
       });
    } catch (error) {
        console.log('[UpdateUserInfo] Server error', error);
        throw error
    }
}