'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCurrentLocale } from '@/locales/client';
import { useScopedI18n } from '@/locales/client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentLocale = useCurrentLocale();
  const scopedT = useScopedI18n('mobileNav');
  return (
    <div className='flex lg:hidden'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Menu />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={currentLocale === 'fa' ? 'right' : 'left'}>
          <div className='px-2 flex flex-col gap-4'>
            <Link
              href='/'
              className='flex items-center mx-auto'
              onClick={() => setIsOpen(false)}
            >
              <span className='font-bold'>StCMS</span>
            </Link>
            <div className='text-sm'>
              <Accordion
                type='multiple'
                defaultValue={['item-1', 'item-2', 'item-3']}
                className='w-full'
              >
                <AccordionItem value='item-1'>
                  <AccordionTrigger>{scopedT('dashboard')}</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-y-2 text-muted-foreground'>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href='/dashboard/stores'
                      >
                        {scopedT('stores')}
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>{scopedT('menu')}</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-y-2 text-muted-foreground'>
                      <Link onClick={() => setIsOpen(false)} href='/'>
                      {scopedT('mainPage')}
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
