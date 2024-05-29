import React from 'react';
import AuthForm from '@/components/layouts/stcms/auth/auth-form';
import { getScopedI18n } from '@/locales/server';

export default async function Auth() {
  const scopedT = await getScopedI18n('auth');
  const authText = {
    header: scopedT('header'),
    phoneNumber: scopedT('phoneNumber'),
    sendCode: scopedT('sendCode'),
    verificationCode: scopedT('verificationCode'),
    checkCode: scopedT('checkCode'),
    resendCodeText: scopedT('resendCodeText'),
    second: scopedT('second'),
    resendCode: scopedT('resendCode'),
  };
  return <AuthForm authText={authText} />;
}
