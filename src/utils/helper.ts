export function addMinutesToDate(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export const generateOtp = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

export const verifyOtpTime = (expireAt: Date) => {
  const now = new Date();

  if (now.getTime() <= expireAt.getTime()) return true;
  return false;
};

export const sendOTP = async (mobile: string, code: string) => {
  // send otp to mobile
  const message = `Your One-Time Password (OTP) for Calcium Calculator is ${code}. This OTP will be valid for 5 minutes.`;

  const send = await fetch(
    `https://api.mobireach.com.bd/SendTextMessage?Username=${process.env.SMS_USERNAME}&Password=${process.env.SMS_PASSWORD}&From=Impala&To=${mobile}&Message=${message}`,
    {
      method: "GET",
    }
  );

  if (!send.ok) {
    throw new Error("Something went wrong");
  }
};
