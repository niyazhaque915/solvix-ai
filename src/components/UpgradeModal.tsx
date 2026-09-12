import { useEffect, useState } from 'react';
import { Check, Sparkles, X, Zap, Crown, ShieldCheck, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BkashIcon, NagadIcon, CardIcon } from '@/components/PaymentIcons';

type UpgradeModalProps = {
  open: boolean;
  onClose: () => void;
  onPurchase: (planId: string, method: string, trxId: string) => void;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  credits: number;
  creditLabel: string;
  features: string[];
  icon: typeof Zap;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    id: 'daily',
    name: 'Daily Pack',
    price: 49,
    period: 'BDT / day',
    credits: 20,
    creditLabel: '20 credits',
    icon: Zap,
    features: ['20 AI credits', 'All tools unlocked', 'Valid for 24 hours'],
  },
  {
    id: 'monthly',
    name: 'Monthly Pro',
    price: 499,
    period: 'BDT / month',
    credits: 300,
    creditLabel: '300 credits',
    icon: Crown,
    highlight: true,
    features: ['300 AI credits', 'Priority AI processing', 'All premium tools', 'Cancel anytime'],
  },
];

type MethodId = 'bkash' | 'nagad' | 'card';

const paymentMethods: {
  id: MethodId;
  name: string;
  number: string;
  icon: typeof BkashIcon;
}[] = [
  { id: 'bkash', name: 'bKash', number: '017XX-XXXXXX', icon: BkashIcon },
  { id: 'nagad', name: 'Nagad', number: '018XX-XXXXXX', icon: NagadIcon },
  { id: 'card', name: 'Card', number: 'Visa / Mastercard', icon: CardIcon },
];

type Step = 'plan' | 'payment' | 'verify' | 'success';

export function UpgradeModal({ open, onClose, onPurchase }: UpgradeModalProps) {
  const [step, setStep] = useState<Step>('plan');
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [selectedMethod, setSelectedMethod] = useState<MethodId>('bkash');
  const [trxId, setTrxId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setStep('plan');
      setTrxId('');
      setCardNumber('');
      setCardCvc('');
      setError('');
      setVerifying(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const method = paymentMethods.find((m) => m.id === selectedMethod)!;
  const needsTrxId = selectedMethod === 'bkash' || selectedMethod === 'nagad';

  const handleProceedToPayment = () => {
    setStep('payment');
    setError('');
  };

  const handleVerify = () => {
    setError('');
    if (needsTrxId) {
      if (trxId.trim().length < 6) {
        setError('Please enter a valid Transaction ID (at least 6 characters).');
        return;
      }
    } else {
      if (cardNumber.replace(/\s/g, '').length < 12 || cardCvc.length < 3) {
        setError('Please enter valid card details.');
        return;
      }
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setStep('success');
      setTimeout(() => {
        onPurchase(selectedPlan, selectedMethod, trxId || cardNumber);
      }, 1500);
    }, 1800);
  };

  const handleBack = () => {
    if (step === 'payment' || step === 'verify') {
      setStep('plan');
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col animate-slide-up overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-slate-900 sm:rounded-3xl">
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2">
            {step !== 'plan' && step !== 'success' && (
              <button
                onClick={handleBack}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <StepDot active={step === 'plan'} done={step !== 'plan'} label="Plan" />
              <StepLine done={step === 'payment' || step === 'verify' || step === 'success'} />
              <StepDot active={step === 'payment' || step === 'verify'} done={step === 'success'} label="Pay" />
              <StepLine done={step === 'success'} />
              <StepDot active={step === 'success'} done={false} label="Done" />
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-6 pt-4">
          {/* STEP: PLAN */}
          {step === 'plan' && (
            <div className="animate-fade-in">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-lg shadow-brand-500/30">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Choose your plan</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Upgrade to keep using Solvix's powerful AI tools.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {plans.map((p) => {
                  const Icon = p.icon;
                  const isSelected = selectedPlan === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all',
                        isSelected
                          ? 'border-brand-500 bg-brand-50/60 dark:border-brand-500 dark:bg-brand-950/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                          p.highlight
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/20'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                          {p.highlight && (
                            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-amber-600 dark:text-amber-400">
                              Best Value
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{p.creditLabel}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">{p.price}</div>
                        <div className="text-[0.65rem] text-slate-400">{p.period}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-1.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Check className="h-4 w-4 shrink-0 text-success-500" />
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={handleProceedToPayment}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-600 py-3.5 font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/40 active:scale-[0.98]"
              >
                Continue to Payment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STEP: PAYMENT */}
          {(step === 'payment' || step === 'verify') && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Payment</h2>
              <div className="mt-1 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{plan.name}</span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">{plan.price} BDT</span>
              </div>

              <p className="mb-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Select payment method</p>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMethod(m.id);
                        setError('');
                        setTrxId('');
                        setCardNumber('');
                        setCardCvc('');
                      }}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 transition-all',
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 dark:border-brand-500 dark:bg-brand-950/30'
                          : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                      )}
                    >
                      <Icon size={28} />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{m.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* bKash / Nagad: send money instructions + TrxID */}
              {needsTrxId && (
                <div className="mt-4 animate-fade-in">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Send Money to</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {selectedMethod === 'bkash' ? <BkashIcon size={22} /> : <NagadIcon size={22} />}
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                          {method.number}
                        </span>
                      </div>
                      <span className="rounded-lg bg-brand-100 px-2 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                        {plan.price} BDT
                      </span>
                    </div>
                    <p className="mt-2 text-[0.7rem] text-slate-400 dark:text-slate-500">
                      Open your {method.name} app, send {plan.price} BDT to the number above, then enter the Transaction ID below.
                    </p>
                  </div>

                  <label className="mt-3 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Transaction ID (TrxID)
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => {
                      setTrxId(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. 9XK4ABCD12"
                    className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-mono font-medium text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-600"
                  />
                </div>
              )}

              {/* Card: card details */}
              {!needsTrxId && (
                <div className="mt-4 animate-fade-in space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(formatted);
                        setError('');
                      }}
                      placeholder="4242 4242 4242 4242"
                      className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => {
                          setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4));
                          setError('');
                        }}
                        placeholder="123"
                        className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-3 text-xs font-medium text-error-500">{error}</p>
              )}

              <button
                onClick={handleVerify}
                disabled={verifying}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-600 py-3.5 font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/40 active:scale-[0.98] disabled:opacity-60"
              >
                {verifying ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verifying payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    Verify Payment
                  </>
                )}
              </button>
              <p className="mt-2 flex items-center justify-center gap-1 text-center text-[0.7rem] text-slate-400 dark:text-slate-500">
                <ShieldCheck className="h-3 w-3" />
                Secure · Instant credit activation
              </p>
            </div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 animate-glow-pulse rounded-full bg-success-500/30" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success-500 to-emerald-600 shadow-xl shadow-success-500/30">
                  <Check className="h-10 w-10 text-white" strokeWidth={3} />
                </div>
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">Payment Verified!</h2>
              <p className="mt-1.5 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                <span className="font-bold text-success-500">{plan.credits} credits</span> have been added to your account. You're all set!
              </p>
              <div className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Plan</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{plan.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Method</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{method.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Amount</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{plan.price} BDT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold transition-colors',
          done
            ? 'bg-success-500 text-white'
            : active
              ? 'bg-brand-500 text-white'
              : 'bg-slate-200 text-slate-400 dark:bg-slate-700'
        )}
      >
        {done ? <Check className="h-3.5 w-3.5" /> : label[0]}
      </div>
    </div>
  );
}

function StepLine({ done }: { done: boolean }) {
  return (
    <div
      className={cn(
        'h-0.5 w-5 rounded-full transition-colors',
        done ? 'bg-success-500' : 'bg-slate-200 dark:bg-slate-700'
      )}
    />
  );
}
