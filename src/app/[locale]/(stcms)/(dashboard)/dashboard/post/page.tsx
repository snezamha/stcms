import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { getScopedI18n } from '@/locales/server';
import { Separator } from '@/components/ui/separator';
import { EmptyPlaceholder } from './components/empty-placeholder';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PostCreateButton } from './components/post-create-button';
import { PostItem } from './components/post-item';
import db from '@/lib/db';

const PostPage = async () => {
  const t = await getScopedI18n('posts');
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 403 });
  }

  const { user } = session;
  const posts = await db.post.findMany({
    where: {
      authorId: user._id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={t('blog')} description='' />
        <PostCreateButton />
      </div>
      <Separator className='my-4' />
      <div>
        {posts?.length ? (
          <div className='divide-y divide-border rounded-md border'>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='post' />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant='outline' />
          </EmptyPlaceholder>
        )}
      </div>
    </>
  );
};

export default PostPage;
