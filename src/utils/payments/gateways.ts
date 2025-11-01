type CheckoutSuccess = (payload: unknown) => void;
type CheckoutCancel = () => void;

export async function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(s);
  });
}

export async function paystackCheckout(opts: {
  email: string;
  amount: number; // in major units
  currency?: 'NGN' | 'GHS' | 'KES' | 'ZAR' | string;
  reference?: string;
  metadata?: Record<string, unknown>;
  onSuccess?: CheckoutSuccess;
  onCancel?: CheckoutCancel;
}): Promise<{ ok: boolean; error?: string }> {
  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;
  if (!key) return { ok: false, error: 'Missing Paystack public key (VITE_PAYSTACK_PUBLIC_KEY).' };

  await loadScript('https://js.paystack.co/v1/inline.js');
  const ref = opts.reference ?? `GP-${Date.now()}`;
  const handler = (window as any).PaystackPop?.setup?.({
    key,
    email: opts.email,
    amount: Math.round(opts.amount * 100), // kobo/cent
    currency: opts.currency ?? 'NGN',
    ref,
    metadata: opts.metadata,
    callback: (response: unknown) => {
      opts.onSuccess?.(response);
    },
    onClose: () => {
      opts.onCancel?.();
    },
  });

  if (!handler) return { ok: false, error: 'Paystack inline SDK not available.' };
  handler.openIframe();
  return { ok: true };
}

export async function flutterwaveCheckout(opts: {
  email: string;
  amount: number;
  currency?: 'NGN' | 'GHS' | 'KES' | 'ZAR' | string;
  phone?: string;
  name?: string;
  reference?: string;
  onSuccess?: CheckoutSuccess;
  onCancel?: CheckoutCancel;
}): Promise<{ ok: boolean; error?: string }> {
  const key = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string | undefined;
  if (!key) return { ok: false, error: 'Missing Flutterwave public key (VITE_FLUTTERWAVE_PUBLIC_KEY).' };

  await loadScript('https://checkout.flutterwave.com/v3.js');
  const ref = opts.reference ?? `GP-${Date.now()}`;
  const checkout = (window as any).FlutterwaveCheckout;
  if (!checkout) return { ok: false, error: 'Flutterwave checkout SDK not available.' };

  checkout({
    public_key: key,
    tx_ref: ref,
    amount: opts.amount,
    currency: opts.currency ?? 'NGN',
    customer: {
      email: opts.email,
      phone_number: opts.phone ?? '',
      name: opts.name ?? '',
    },
    callback: (data: unknown) => {
      opts.onSuccess?.(data);
    },
    onclose: () => {
      opts.onCancel?.();
    },
  });

  return { ok: true };
}

// M-Pesa typically requires a server-side STK push for security.
export async function mpesaStkPush(): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: 'M-Pesa STK Push requires a server endpoint. Configure server-side integration.' };
}