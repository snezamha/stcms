'use client';

import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { register } from '@/actions/register';
import { signIn } from 'next-auth/react';

import { useCurrentLocale } from '@/locales/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
export default function AuthForm({
  authText,
}: {
  authText: {
    header: string;
    phoneNumber: string;
    sendCode: string;
    verificationCode: string;
    checkCode: string;
    resendCodeText: string;
    second: string;
    resendCode: string;
    [key: string]: string;
  };
}) {
  const locale = useCurrentLocale();
  const [errorRegister, setErrorRegister] = useState<string | undefined>('');
  const [successRegister, setSuccessRegister] = useState<string | undefined>(
    ''
  );
  const [errorLogin, setErrorLogin] = useState<string | undefined>('');
  const [successLogin, setSuccessLogin] = useState<string | undefined>('');
  const [isPendingRegister, startTransitionRegister] = useTransition();
  const [isPendingLogin, startTransitionLogin] = useTransition();

  const [checked, setChecked] = useState(false);
  const [time, setTime] = useState(0);
  const REG = /^09\d{9}$/;
  const RegisterSchema = z.object({
    phoneNumber: z
      .string()
      .length(11, {
        message:
          locale === 'fa'
            ? 'لطفاً تلفن همراه را مطابق نمونه و 11 رقم وارد کنید'
            : 'Please enter the mobile phone according to the example and 11 digits',
      })
      .regex(
        REG,
        locale === 'fa'
          ? 'تلفن همراه معتبر نیست، فرمت صحیح این است: 09XXXXXXXXX'
          : 'The mobile phone is not valid, the correct format is: 09XXXXXXXX'
      ),
  });
  const formRegister = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });
  const LoginSchema = z.object({
    phoneNumber: z.string(),
    otpCode: z.string().length(4, {
      message:
        locale === 'fa'
          ? 'لطفاً یک کد تأیید 4 رقمی وارد کنید'
          : 'Please enter a 4-digit verification code',
    }),
  });
  const formLogin = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phoneNumber: '',
      otpCode: '',
    },
  });
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const onSubmitRegister = (values: z.infer<typeof RegisterSchema>) => {
    setErrorRegister('');
    setSuccessRegister('');

    startTransitionRegister(() => {
      register(values).then((data) => {
        setErrorRegister(data.error);
        setSuccessRegister(data.success);
        setChecked((prev) => !prev);
        if (data.sec !== undefined) {
          setTime(data.sec);
        } else {
          setTime(120);
        }
      });
    });
  };
  const onSubmitLogin = async (values: z.infer<typeof LoginSchema>) => {
    setErrorLogin('');
    setSuccessLogin('');
    values.phoneNumber = formRegister.getValues().phoneNumber;
    try {
      const result = await signIn('credentials', {
        phoneNumber: values.phoneNumber,
        otpCode: values.otpCode,
        redirect: true,
      });
      if (result?.error) {
        formLogin.reset();
        setErrorLogin(result.error);
      }
    } catch (err) {
      setErrorLogin('An error has occurred');
    }
  };
  const changeNumber = (e: any) => {
    e.preventDefault();
    setErrorRegister('');
    setSuccessRegister('');
    setErrorLogin('');
    setSuccessLogin('');
    setChecked((prev) => !prev);
  };
  return (
    <div className={cn('flex flex-col gap-4')}>
      <div className='tracking-tight transition-colors text-center'>
        {authText.header}
      </div>
      <Form {...formRegister}>
        <form
          onSubmit={formRegister.handleSubmit(onSubmitRegister)}
          className='space-y-6'
        >
          <div className={'space-y-4 ' + (checked ? 'hidden' : 'block')}>
            <FormField
              control={formRegister.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{authText.phoneNumber}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPendingRegister || checked}
                      placeholder='09XXXXXXXXX'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorRegister} />
          <FormSuccess message={successRegister} />
          <Button
            disabled={isPendingRegister || checked}
            type='submit'
            className={'w-full ' + (checked ? 'hidden' : 'block')}
          >
            {authText.sendCode}
          </Button>
        </form>
      </Form>
      <Form {...formLogin}>
        <form
          onSubmit={formLogin.handleSubmit(onSubmitLogin)}
          className={'space-y-6 py-6 ' + (checked ? 'block' : 'hidden')}
        >
          <div className='space-y-4'>
            <FormField
              control={formLogin.control}
              name='otpCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{authText.verificationCode}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPendingLogin}
                      placeholder='XXXX'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorLogin} />
          <FormSuccess message={successLogin} />
          <Button disabled={isPendingLogin} type='submit' className='w-full'>
            {authText.checkCode}
          </Button>
          <Button
            className='w-full'
            disabled={time > 0}
            onClick={(e) => changeNumber(e)}
          >
            {time > 0 ? (
              <span className='text-xs'>
                {authText.resendCodeText}
                <span className='text-lg text-red-600'> {time} </span>
                {authText.second}
              </span>
            ) : (
              authText.resendCode
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
