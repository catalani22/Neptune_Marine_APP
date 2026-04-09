import { 
  getCurrentWallet, 
  rotateWallet,
  getActiveChains,
  SUPPORTED_CHAINS,
  type WalletAddress
} from './wallets';

import {
  getPaymentInstructions,
  CHAIN_TOKENS,
  checkPaymentStatus
} from './crypto';

// Calculate 10% deposit amount
export function calculateDeposit(
  totalPrice: number,
  currency: string = 'USD'
): { deposit: number; remaining: number; currency: string } {
  const deposit = Math.round(totalPrice * 0.10 * 100) / 100;
  const remaining = Math.round((totalPrice - deposit) * 100) / 100;
  return { deposit, remaining, currency };
}

// Get payment QR code data for various chains
export function getPaymentQRData(
  chain: string,
  currency: string,
  amount: string
): {
  address: string;
  chain: string;
  currency: string;
  amount: string;
  qrString: string;
  uri: string;
} | null {
  try {
    const wallet = getCurrentWallet(chain);
    if (!wallet) return null;
    
    // For different chains, format the payment URI accordingly
    let uri = '';
    let qrString = '';
    
    switch (chain) {
      case 'ETH':
      case 'BSC':
      case 'POL':
      case 'ARB':
      case 'AVAX':
      case 'BASE':
        // Ethereum-style URI
        // For Ethereum-based chains
        uri = `ethereum:${wallet.address}?value=${amount}`;
        qrString = `${wallet.address}|${currency}|${amount}`;
        break;
        
      case 'SOL':
        // Solana uses different format
        uri = `${wallet.address}?amount=${amount}&currency=${currency}`;
        qrString = `${wallet.address}|${currency}|${amount}`;
        break;
        
      case 'BTC':
        // Bitcoin
        uri = `bitcoin:${wallet.address}?amount=${amount}`;
        qrString = `${wallet.address}|BTC|${amount}`;
        break;
        
      default:
        uri = wallet.address;
        qrString = wallet.address;
    }
    
    return {
      address: wallet.address,
      chain,
      currency,
      amount,
      qrString,
      uri
    };
  } catch (e) {
    console.error('Error generating QR data:', e);
    return null;
  }
}

// Create a new booking with crypto pre-reservation
export interface CreateBookingInput {
  vesselId: string;
  departureDate?: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  totalPrice: number;
  currency: string;
  preferredChain: string;
  preferredCurrency: string;
}

export interface BookingConfirmation {
  bookingId: string;
  depositAmount: number;
  depositCurrency: string;
  paymentAddress: string;
  paymentChain: string;
  paymentInstructions: string;
  expiresAt: Date;
  status: 'pending_crypto' | 'pending_card' | 'confirmed' | 'cancelled';
}

// Generate unique booking ID
function generateBookingId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `NM-${timestamp}-${random}`.toUpperCase();
}

// Create a new booking
export function createCryptoBooking(input: CreateBookingInput): BookingConfirmation {
  const { deposit } = calculateDeposit(input.totalPrice, input.currency);
  
  // Get wallet for the preferred chain
  let chain = input.preferredChain.toUpperCase();
  let wallet = getCurrentWallet(chain);
  
  // Fallback to ETH if preferred chain not available
  if (!wallet) {
    chain = 'ETH';
    wallet = getCurrentWallet(chain);
  }
  
  if (!wallet) {
    throw new Error('No payment wallet available');
  }
  
  const bookingId = generateBookingId();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  const paymentInstructions = getPaymentInstructions(chain, input.preferredCurrency, deposit.toString());
  
  return {
    bookingId,
    depositAmount: deposit,
    depositCurrency: input.preferredCurrency,
    paymentAddress: wallet.address,
    paymentChain: chain,
    paymentInstructions,
    expiresAt,
    status: 'pending_crypto'
  };
}

// Check if payment was received (simulation - in production would check blockchain)
export async function verifyPayment(
  _bookingId: string,
  txHash: string,
  _expectedAmount: number,
  chain: string
): Promise<{
  verified: boolean;
  status: 'pending' | 'confirmed' | 'failed';
  message: string;
}> {
  // In production, this would check the blockchain for the transaction
  // For now, we'll simulate based on tx hash presence
  
  try {
    const status = await checkPaymentStatus(txHash, chain);
    
    if (status.status === 'confirmed') {
      return {
        verified: true,
        status: 'confirmed',
        message: 'Payment confirmed! Your booking is now confirmed.'
      };
    } else if (status.status === 'pending') {
      return {
        verified: false,
        status: 'pending',
        message: 'Payment detected but awaiting confirmations. Please wait.'
      };
    } else {
      return {
        verified: false,
        status: 'failed',
        message: 'Payment verification failed. Please try again or contact support.'
      };
    }
  } catch (e) {
    // For demo purposes, accept if we have a tx hash
    if (txHash && txHash.length > 10) {
      return {
        verified: true,
        status: 'confirmed',
        message: 'Payment submitted (demo mode). Your booking is confirmed.'
      };
    }
    
    return {
      verified: false,
      status: 'failed',
      message: 'Unable to verify payment. Please try again.'
    };
  }
}

// Rotate to next wallet after failed payment attempt
export function getNextPaymentWallet(chain: string): WalletAddress | null {
  return rotateWallet(chain);
}

// Get all supported payment options for display
export function getPaymentOptions() {
  const chains = getActiveChains();
  
  return chains.map(chain => {
    const config = SUPPORTED_CHAINS[chain];
    const wallet = getCurrentWallet(chain);
    const tokens = CHAIN_TOKENS[chain] || [];
    
    return {
      chain: config?.name || chain,
      chainId: chain,
      symbol: config?.symbol,
      tokens: tokens.map(token => ({
        name: token,
        symbol: token,
      })),
      currentAddress: wallet?.address,
      explorerUrl: config?.explorerUrl,
    };
  });
}

// Format price with 10% markup (our service fee)
export function formatPriceWithMarkup(basePrice: number, currency: string = 'EUR'): {
  original: string;
  withMarkup: string;
  markupAmount: number;
  currency: string;
} {
  const markup = Math.round(basePrice * 1.10 * 100) / 100;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  
  return {
    original: formatter.format(basePrice),
    withMarkup: formatter.format(markup),
    markupAmount: Math.round((markup - basePrice) * 100) / 100,
    currency
  };
}

// Card payment fallback (still with 10% deposit, remainder later)
export function createCardBooking(input: CreateBookingInput): {
  bookingId: string;
  depositAmount: number;
  depositCurrency: string;
  remainingAmount: number;
  status: string;
  instructions: string;
} {
  const { deposit, remaining } = calculateDeposit(input.totalPrice, input.currency);
  
  return {
    bookingId: generateBookingId(),
    depositAmount: deposit,
    depositCurrency: input.currency,
    remainingAmount: remaining,
    status: 'pending_card',
    instructions: `To confirm your booking, please pay a ${deposit} ${input.currency} deposit (10% of total). The remaining ${remaining} ${input.currency} can be paid directly to the charter company via bank transfer or card.`
  };
}