import { useState } from 'react';
import { 
  createCryptoBooking, 
  calculateDeposit, 
  getPaymentOptions, 
  formatPriceWithMarkup,
  type BookingConfirmation,
  type CreateBookingInput
} from '../../lib/booking';
import { getCurrentWallet, SUPPORTED_CHAINS } from '../../lib/wallets';
import { Bitcoin, CreditCard, Shield, AlertCircle, CheckCircle, Loader2, Wallet } from 'lucide-react';

interface CheckoutProps {
  vessel: {
    id: string;
    title: string;
    basePrice: number;
    currency: string;
    images?: string[];
  };
  onSuccess?: (booking: BookingConfirmation) => void;
  onCancel?: () => void;
}

export function CryptoCheckout({ vessel, onSuccess, onCancel }: CheckoutProps) {
  const [step, setStep] = useState<'select' | 'pay' | 'confirm'>('select');
  const [selectedChain, setSelectedChain] = useState('ETH');
  const [selectedToken, setSelectedToken] = useState('USDT');
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [txHash, setTxHash] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [_verified, setVerified] = useState(false);

  const prices = formatPriceWithMarkup(vessel.basePrice, vessel.currency);
  const { deposit } = calculateDeposit(vessel.basePrice, vessel.currency);

  const paymentOptions = getPaymentOptions();

  const handleStartBooking = () => {
    if (!guestData.name || !guestData.email) {
      alert('Please fill in your name and email');
      return;
    }

    const input: CreateBookingInput = {
      vesselId: vessel.id,
      guestName: guestData.name,
      guestEmail: guestData.email,
      guestPhone: guestData.phone,
      totalPrice: vessel.basePrice * 1.1, // 10% markup
      currency: vessel.currency,
      preferredChain: selectedChain,
      preferredCurrency: selectedToken,
    };

    const newBooking = createCryptoBooking(input);
    setBooking(newBooking);
    setStep('pay');
  };

  const handleVerifyPayment = async () => {
    if (!txHash || txHash.length < 10) {
      alert('Please enter a valid transaction hash');
      return;
    }

    setVerifying(true);

    // Simulate verification
    setTimeout(() => {
      setVerified(true);
      setStep('confirm');
      setVerifying(false);
      if (onSuccess) onSuccess(booking!);
    }, 2000);
  };

  if (step === 'confirm') {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-primary mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your pre-reservation has been confirmed with crypto payment.
          </p>
          
          <div className="bg-muted rounded-lg p-4 text-left mb-6">
            <p className="text-sm text-muted-foreground mb-2">Booking ID</p>
            <p className="font-mono font-medium">{booking?.bookingId}</p>
          </div>
          
          <div className="space-y-2 text-sm text-left mb-6">
            <p><strong>Deposit Paid:</strong> {booking?.depositAmount} {booking?.depositCurrency}</p>
            <p><strong>Vessel:</strong> {vessel.title}</p>
            <p><strong>Status:</strong> Confirmed</p>
          </div>

          <p className="text-xs text-muted-foreground">
            A confirmation email has been sent to {guestData.email}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'pay' && booking) {
    const wallet = getCurrentWallet(selectedChain);
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-serif font-medium text-primary mb-6">
          Complete Your Payment
        </h2>

        {/* Price Summary */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span>Original Price</span>
            <span className="text-muted-foreground line-through">{prices.original}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Service Fee (10%)</span>
            <span className="text-gold">+{prices.markupAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium border-t pt-2">
            <span>Total</span>
            <span>{prices.withMarkup}</span>
          </div>
          <div className="flex justify-between text-green-600 mt-2">
            <span>Deposit (10%)</span>
            <span className="font-medium">{deposit.toFixed(2)} {vessel.currency}</span>
          </div>
        </div>

        {/* Payment Address */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Send {selectedToken} to:</span>
          </div>
          
          <div className="bg-white border rounded p-3 font-mono text-sm break-all mb-3">
            {wallet?.address || 'Loading...'}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Network: {SUPPORTED_CHAINS[selectedChain]?.name || selectedChain}
          </p>
        </div>

        {/* Transaction Hash Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Transaction Hash (after sending)
          </label>
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x..."
            className="w-full p-3 border rounded-lg font-mono text-sm"
          />
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Send exactly <strong>{deposit.toFixed(2)} {selectedToken}</strong> to the address above. 
            Transactions sent to incorrect addresses cannot be recovered.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => setStep('select')}
            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleVerifyPayment}
            disabled={verifying}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Payment'
            )}
          </button>
        </div>

        {/* Timer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Payment expires at {booking.expiresAt.toLocaleString()}
        </p>
      </div>
    );
  }

  // Step 1: Select payment method and enter details
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-serif font-medium text-primary mb-6">
        Reserve Your Yacht
      </h2>

      {/* Vessel Summary */}
      <div className="flex gap-4 mb-6 p-4 bg-muted rounded-lg">
        {vessel.images?.[0] && (
          <img src={vessel.images[0]} alt={vessel.title} className="w-20 h-20 object-cover rounded" />
        )}
        <div>
          <h3 className="font-medium">{vessel.title}</h3>
          <p className="text-sm text-muted-foreground">
            From {prices.original} → <span className="text-green-600 font-medium">{prices.withMarkup}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Deposit: {deposit.toFixed(2)} {vessel.currency} (10%)
          </p>
        </div>
      </div>

      {/* Guest Details */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Your Details</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name *"
            value={guestData.name}
            onChange={(e) => setGuestData({...guestData, name: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email Address *"
            value={guestData.email}
            onChange={(e) => setGuestData({...guestData, email: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={guestData.phone}
            onChange={(e) => setGuestData({...guestData, phone: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Payment Method</h3>
        
        {/* Crypto Option */}
        <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4 mb-3">
          <div className="flex items-center gap-3 mb-3">
            <Bitcoin className="w-6 h-6 text-orange-500" />
            <span className="font-medium">Pay with Crypto</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Recommended</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="p-2 border rounded text-sm"
            >
              {(paymentOptions as { chainId: string; chain: string; tokens: { symbol: string; name: string }[] }[]).map((opt) => (
                <option key={opt.chainId} value={opt.chainId}>{opt.chain}</option>
              ))}
            </select>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="p-2 border rounded text-sm"
            >
              {(paymentOptions as { chainId: string; chain: string; tokens: { symbol: string; name: string }[] }[]).find(p => p.chainId === selectedChain)?.tokens.map((t) => (
                <option key={t.symbol} value={t.symbol}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Card Option */}
        <div className="border rounded-lg p-4 opacity-75">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-6 h-6 text-gray-400" />
            <span className="font-medium text-gray-500">Pay with Card</span>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          Secure Booking
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Bitcoin className="w-4 h-4" />
          Crypto Rewards
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleStartBooking}
          className="flex-1 py-3 bg-[#c9a227] text-white font-medium rounded-lg hover:bg-[#b8921f]"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default CryptoCheckout;