import axios from 'axios';
import crypto from 'crypto';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

export const initializeFlutterwavePayment = async (data: {
  tx_ref: string;
  amount: number;
  currency: string;
  redirect_url: string;
  customer: {
    email: string;
    name?: string;
    phonenumber?: string;
  };
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
}) => {
  if (!FLW_SECRET_KEY) {
    throw new Error('Flutterwave secret key is not configured');
  }

  const response = await axios.post(
    'https://api.flutterwave.com/v3/payments',
    data,
    {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const verifyFlutterwaveTransaction = async (transactionId: string) => {
  if (!FLW_SECRET_KEY) {
    throw new Error('Flutterwave secret key is not configured');
  }

  const response = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const validateFlutterwaveWebhook = (signature: string, payload: any) => {
  const secretHash = process.env.FLW_SECRET_HASH;
  return signature === secretHash;
};
