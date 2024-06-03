'use server';
import { getScopedI18n } from '@/locales/server';
import { sendOtp } from '@/utils/sms';

import * as z from 'zod';
const REG = /^09\d{9}$/;
const RegisterSchema = z.object({
  phoneNumber: z.string().length(11).regex(REG),
});
import db from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const t = await getScopedI18n('auth.message');
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }

  const { phoneNumber } = validatedFields.data;
  var randNumber = Math.floor(1000 + Math.random() * 9000);
  var currentDate = new Date();
  var twoMinutesLater = new Date(currentDate.getTime() + 120 * 1000);

  const existingUser = await db.user.findUnique({
    where: {
      phoneNumber,
    },
  });
  if (existingUser) {
    if (checkValidOtp(existingUser.otpExpiresIn)) {
      await db.user.update({
        where: {
          phoneNumber,
        },
        data: {
          otpCode: randNumber.toString(),
          otpExpiresIn: twoMinutesLater,
        },
      });
      sendOtp(existingUser.phoneNumber, randNumber);
      console.log(existingUser.phoneNumber, randNumber);

      return {
        success: t('codeSent'),
        sec: countSecons(twoMinutesLater),
      };
    } else {
      return {
        error: t('receivedCode'),
        sec: countSecons(existingUser.otpExpiresIn),
      };
    }
  }
  await db.user.create({
    data: {
      phoneNumber,
      otpCode: randNumber.toString(),
      otpExpiresIn: twoMinutesLater,
      isAdmin: false,
    },
  });
  sendOtp(phoneNumber, randNumber);
  console.log(phoneNumber, randNumber);

  return { success: t('codeSent'), sec: countSecons(twoMinutesLater) };
};

function countSecons(time: any) {
  var currentDate = new Date();
  var diff = Math.floor((time - currentDate.getTime()) / 1000);
  return diff;
}
function checkValidOtp(otpValidTime: any) {
  var currentDate = new Date();
  var diff = Math.floor(
    (Date.parse(otpValidTime) - currentDate.getTime()) / 1000
  );
  if (diff < 0) {
    return true;
  }
}
