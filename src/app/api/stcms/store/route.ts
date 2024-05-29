import { z } from 'zod';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { storeSchema } from '@/lib/stcms/validators/store';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { name, description } = storeSchema.parse(body);
    await prisma.store.create({
      data: {
        name,
        description,
        userId: session.user._id ,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    console.log(error);

    return new Response('Could not create store, please try again later.', {
      status: 500,
    });
  }
}
