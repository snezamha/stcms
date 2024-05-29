import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { productSchema } from '@/lib/stcms/validators/product';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { name, description, price, category, images = [] } = body;

    const {
      name: parsedName,
      description: parsedDescription,
      price: parsedPrice,
      category: parsedCategory,
      images: parsedImages,
    } = productSchema.parse({
      name,
      description,
      price,
      category,
      images,
    });

    const store = await prisma.store.findUnique({
      where: { id: params.storeId },
    });

    if (!store) {
      return new Response('Store not found', { status: 404 });
    }

    const product = await prisma.product.create({
      data: {
        name: parsedName,
        description: parsedDescription,
        price: parsedPrice.toString(),
        category: parsedCategory,
        images: parsedImages,
        Store: { connect: { id: params.storeId } },
      },
    });

    return Response.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    console.log(error);

    return new Response('Could not create product, please try again later.', {
      status: 500,
    });
  }
}
