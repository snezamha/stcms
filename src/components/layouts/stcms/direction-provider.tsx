'use client';

import { DirectionProvider } from '@radix-ui/react-direction';
import { useCurrentLocale } from '@/locales/client';

type Props = {
  children: React.ReactNode;
};

const Direction = (props: Props) => {
  const locale = useCurrentLocale();
  return (
    <DirectionProvider dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      {props.children}
    </DirectionProvider>
  );
};

export default Direction;
