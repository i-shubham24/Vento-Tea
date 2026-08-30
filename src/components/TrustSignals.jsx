import { ShieldCheck, Truck, BadgeCheck, CreditCard } from 'lucide-react';

export default function TrustSignals() {
  return (
    <div className="bg-white border-y border-vento-cream-dark py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-6 text-center">
        <div className="flex items-center gap-2 text-vento-forest font-semibold text-sm"><ShieldCheck size={18} className="text-vento-gold" /> Secure Checkout</div>
        <div className="flex items-center gap-2 text-vento-forest font-semibold text-sm"><Truck size={18} className="text-vento-gold" /> Ships in 24hrs</div>
        <div className="flex items-center gap-2 text-vento-forest font-semibold text-sm"><BadgeCheck size={18} className="text-vento-gold" /> 30-day money-back guarantee</div>
        <div className="flex items-center gap-2 text-sm text-gray-600"><CreditCard size={18} className="text-vento-gold" /> UPI • Cards • COD • Net Banking</div>
      </div>
    </div>
  );
}
