import Footer from '@/components/layouts/stcms/footer';

export default async function FrontLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
