'use client';
import { CheckIcon, LanguagesIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from '@/locales/client';
import { Button } from '@/components/ui/button';

export default function LocaleToggler() {
  const scopedT = useScopedI18n('language');

  const locales = [
    {
      name: scopedT('english'),
      value: 'en',
    },
    {
      name: scopedT('farsi'),
      value: 'fa',
    },
  ];
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const currentLocale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <LanguagesIcon className='h-5 w-5' />
          <span className='sr-only'>Change Locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.value}
            onClick={() => changeLocale(locale.value as typeof currentLocale)}
            disabled={locale.value === currentLocale}
          >
            <span>{locale.name}</span>
            {locale.value === currentLocale ? (
              <DropdownMenuShortcut>
                <CheckIcon className='h-5 w-5' />
              </DropdownMenuShortcut>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
