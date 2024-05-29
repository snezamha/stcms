import { z } from 'zod';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { productSchema } from '@/lib/stcms/validators/product';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { name, description, price, category, images } =
      productSchema.parse(body);

    const isProductExist = await prisma.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    if (!isProductExist) {
      return new Response('Product not found.', {
        status: 404,
      });
    }

    await prisma.product.update({
      where: {
        storeId: params.storeId,
        id: params.productId,
      },
      data: {
        name,
        description,
        price: price.toString(),
        category,
        images,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    console.log(error);

    return new Response('Could not update product, please try again later.', {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    if (!product) {
      return new Response('Product not found.', {
        status: 404,
      });
    }

    await prisma.product.delete({
      where: {
        storeId: params.storeId,
        id: params.productId,
      },
    });

    // @ts-expect-error
    await utapi.deleteFiles(product.images.map((img) => img.key));

    return new Response('OK');
  } catch (error) {
    console.log(error);
    return new Response('Could not delete product, please try again later.', {
      status: 500,
    });
  }
}
