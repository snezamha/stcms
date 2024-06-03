'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
export interface payload {
  fullName: string;
  phoneNumber: string;
}
export const updateUser = async (id: string, payload: payload) => {
  await db.user.update({
    where: { id },
    data: { ...payload },
  });

  revalidatePath('/dashboard/profile');
};
