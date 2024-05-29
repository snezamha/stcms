import { z } from 'zod';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { storeSchema } from '@/lib/stcms/validators/store';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { name, description } = storeSchema.parse(body);

    await prisma.store.update({
      where: {
        id: params.storeId,
        userId: session.user._id,
      },
      data: {
        name,
        description,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    console.log(error);

    return new Response('Could not update store, please try again later.', {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user._id,
      },
    });

    if (!store) {
      return new Response('Store not found', { status: 404 });
    }

    await prisma.store.delete({
      where: {
        id: params.storeId,
        userId: session.user._id,
      },
    });

    return new Response('OK');
  } catch (error) {
    return new Response('Could not update store, please try again later.', {
      status: 500,
    });
  }
}
