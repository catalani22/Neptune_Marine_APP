import {
  getCurrentWallet,
  rotateWallet,
  getReceiveAddressWithFallback,
  SUPPORTED_CHAINS,
  type ChainConfig,
  type WalletAddress,
  type WalletRotation,
} from './wallets';

export {
  getCurrentWallet,
  rotateWallet,
  getReceiveAddressWithFallback,
  SUPPORTED_CHAINS,
  type ChainConfig,
  type WalletAddress,
  type WalletRotation,
};

// Supported tokens per chain
export const CHAIN_TOKENS: Record<string, string[]> = {
  ETH: ['ETH', 'USDT', 'USDC', 'WBTC'],
  POL: ['MATIC', 'USDT', 'USDC'],
  ARB: ['ETH', 'USDT', 'USDC'],
  BSC: ['BNB', 'USDT', 'USDC'],
  AVAX: ['AVAX', 'USDT', 'USDC'],
  TRX: ['TRX', 'USDT', 'USDC'],
  BTC: ['BTC'],
  SOL: ['SOL', 'USDC'],
};

// Get QR code payment info
export function getPaymentInfo(chain: string, currency: string) {
  const wallet = getCurrentWallet(chain);
  
  if (!wallet) {
    throw new Error(`No wallet available for chain: ${chain}`);
  }
  
  const chainConfig = SUPPORTED_CHAINS[chain];
  if (!chainConfig) {
    throw new Error(`Unsupported chain: ${chain}`);
  }
  
  const isNativeToken = (currency === chainConfig.symbol);
  
  return {
    chain: chainConfig.name,
    chainId: chain,
    symbol: currency,
    address: wallet.address,
    label: wallet.label,
    isNativeToken,
    explorerUrl: chainConfig.explorerUrl,
    decimals: chainConfig.decimals,
  };
}

// Generate payment instruction text
export function getPaymentInstructions(chain: string, currency: string, amount: string): string {
  const info = getPaymentInfo(chain, currency);
  
  const instructions = [
    `Send exactly ${amount} ${currency} to:`,
    '',
    `**${info.address}**`,
    '',
    `Network: ${info.chain} (${info.chainId})`,
    '',
    `⚠️ Important:`,
    `- Send only ${currency} on ${info.chain} network`,
    `- Sending other tokens may result in permanent loss`,
    `- Minimum confirmations: 2`,
  ];
  
  return instructions.join('\n');
}

// Check if chain supports token
export function isTokenSupported(chain: string, currency: string): boolean {
  const tokens = CHAIN_TOKENS[chain] || [];
  return tokens.includes(currency.toUpperCase());
}

// Get supported currencies
export function getSupportedCurrencies(): { chain: string; currencies: string[] }[] {
  return Object.entries(CHAIN_TOKENS).map(([chain, currencies]) => ({
    chain,
    currencies,
  }));
}

// Payment status interface
export interface PaymentStatus {
  status: 'pending' | 'confirmed' | 'failed';
  txHash?: string;
  amount?: string;
  currency?: string;
  confirmations?: number;
  blockNumber?: number;
  timestamp?: Date;
}

// Simulate checking payment (in production, use blockchain APIs)
export async function checkPaymentStatus(
  txHash: string,
  _chain: string
): Promise<PaymentStatus> {
  // This is a placeholder - in production, integrate with:
  // - Etherscan/Alchemy/Infura API for EVM chains
  // - TronGrid for TRX
  // - Blockchain.info for BTC
  // - Solana JSON-RPC for SOL
  
  // For now, return pending
  return {
    status: 'pending',
    txHash,
  };
}

// Retry payment on next wallet (cascade)
export async function attemptPaymentCascade(
  chain: string,
  currency: string,
  amount: string,
  maxAttempts = 3
): Promise<{
  success: boolean;
  address: string;
  attempts: number;
}> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentWallet = getCurrentWallet(chain);
    
    if (!currentWallet) {
      // Try fallback chain
      if (chain === 'ETH') {
        return attemptPaymentCascade('TRX', currency, amount, maxAttempts - attempt);
      }
      continue;
    }
    
    console.log(`💳 Payment attempt ${attempt + 1} on ${chain}: ${currentWallet.address}`);
    
    // In production, here we would:
    // 1. Monitor the address for incoming payments
    // 2. Check if amount matches
    // 3. Wait for confirmations
    
    // For now, just rotate for next attempt
    rotateWallet(chain);
  }
  
  return {
    success: false,
    address: '',
    attempts: maxAttempts,
  };
}
