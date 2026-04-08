import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXpkcnBldHJnd3V4Zm9kaWFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY3NjkyOCwiZXhwIjoyMDkxMjUyOTI4fQ.0XPLbJhe-JWRVpkXg1xVxXdnT808t_Og7JonYD2y9LA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

export interface ChainConfig {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  explorerUrl: string;
  isActive: boolean;
}

export interface WalletAddress {
  id: string;
  chain: string;
  address: string;
  label: string;
  isActive: boolean;
  rotationIndex: number;
  createdAt: string;
  lastUsedAt: string | null;
  totalReceived: string;
  status: 'active' | 'pending' | 'failed';
}

export interface WalletRotation {
  chain: string;
  currentIndex: number;
  addresses: WalletAddress[];
}

// Supported chains
export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  ETH: {
    id: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://etherscan.io',
    isActive: true,
  },
  BSC: {
    id: 'BSC',
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    decimals: 18,
    explorerUrl: 'https://bscscan.com',
    isActive: true,
  },
  POL: {
    id: 'POL',
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    explorerUrl: 'https://polygonscan.com',
    isActive: true,
  },
  ARB: {
    id: 'ARB',
    name: 'Arbitrum',
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://arbiscan.io',
    isActive: true,
  },
  AVAX: {
    id: 'AVAX',
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
    explorerUrl: 'https://snowtrace.io',
    isActive: true,
  },
  TRX: {
    id: 'TRX',
    name: 'Tron',
    symbol: 'TRX',
    decimals: 6,
    explorerUrl: 'https://tronscan.io',
    isActive: true,
  },
  BTC: {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 8,
    explorerUrl: 'https://blockstream.info',
    isActive: true,
  },
  SOL: {
    id: 'SOL',
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    explorerUrl: 'https://solscan.io',
    isActive: true,
  },
};

// Default wallet rotation from environment
function getDefaultWallets(): WalletRotation[] {
  const wallets: WalletRotation[] = [];
  
  // ETH wallets
  const ethWallets = process.env.ETH_WALLETS?.split(',').map((w) => w.trim()).filter(Boolean) || [];
  if (ethWallets.length > 0) {
    wallets.push({
      chain: 'ETH',
      currentIndex: 0,
      addresses: ethWallets.map((address, i) => ({
        id: `eth-${i}`,
        chain: 'ETH',
        address,
        label: `ETH Wallet ${i + 1}`,
        isActive: true,
        rotationIndex: i,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        totalReceived: '0',
        status: 'active',
      })),
    });
  }
  
  // TRX wallets
  const trxWallets = process.env.TRX_WALLETS?.split(',').map((w) => w.trim()).filter(Boolean) || [];
  if (trxWallets.length > 0) {
    wallets.push({
      chain: 'TRX',
      currentIndex: 0,
      addresses: trxWallets.map((address, i) => ({
        id: `trx-${i}`,
        chain: 'TRX',
        address,
        label: `TRX Wallet ${i + 1}`,
        isActive: true,
        rotationIndex: i,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        totalReceived: '0',
        status: 'active',
      })),
    });
  }
  
  // BTC wallet
  const btcWallet = process.env.BTC_WALLET;
  if (btcWallet) {
    wallets.push({
      chain: 'BTC',
      currentIndex: 0,
      addresses: [{
        id: 'btc-0',
        chain: 'BTC',
        address: btcWallet,
        label: 'BTC Wallet 1',
        isActive: true,
        rotationIndex: 0,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        totalReceived: '0',
        status: 'active',
      }],
    });
  }
  
  // SOL wallet
  const solWallets = process.env.SOL_WALLETS?.split(',').map((w) => w.trim()).filter(Boolean) || [];
  if (solWallets.length > 0) {
    wallets.push({
      chain: 'SOL',
      currentIndex: 0,
      addresses: solWallets.map((address, i) => ({
        id: `sol-${i}`,
        chain: 'SOL',
        address,
        label: `SOL Wallet ${i + 1}`,
        isActive: true,
        rotationIndex: i,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        totalReceived: '0',
        status: 'active',
      })),
    });
  }
  
  return wallets;
}

// In-memory wallet rotation state
let walletRotations: WalletRotation[] = getDefaultWallets();

// Get current wallet for a chain (with rotation)
export function getCurrentWallet(chain: string): WalletAddress | null {
  const rotation = walletRotations.find(r => r.chain === chain);
  if (!rotation || rotation.addresses.length === 0) return null;
  
  const currentWallet = rotation.addresses[rotation.currentIndex];
  return currentWallet || null;
}

// Get next wallet in rotation (round-robin)
export function rotateWallet(chain: string): WalletAddress | null {
  const rotation = walletRotations.find(r => r.chain === chain);
  if (!rotation || rotation.addresses.length === 0) return null;
  
  // Move to next wallet
  rotation.currentIndex = (rotation.currentIndex + 1) % rotation.addresses.length;
  
  const nextWallet = rotation.addresses[rotation.currentIndex];
  console.log(`🔄 Rotated ${chain} wallet to index ${rotation.currentIndex}: ${nextWallet.address}`);
  
  return nextWallet;
}

// Get all wallets for a chain
export function getChainWallets(chain: string): WalletAddress[] {
  const rotation = walletRotations.find(r => r.chain === chain);
  return rotation?.addresses || [];
}

// Get all active chains
export function getActiveChains(): string[] {
  return walletRotations.map(r => r.chain).filter(chain => {
    const config = SUPPORTED_CHAINS[chain];
    return config?.isActive;
  });
}

// Get all wallets
export function getAllWallets(): WalletRotation[] {
  return walletRotations;
}

// Initialize wallets from database (override defaults)
export async function initializeWallets(supabaseClient: SupabaseClient): Promise<void> {
  try {
    const { data: dbWallets, error } = await supabaseClient
      .from('wallets')
      .select('*')
      .eq('is_active', true)
      .eq('status', 'active')
      .order('rotation_index');
    
    if (error) {
      console.log('⚠️ Using default wallet config from env');
      return;
    }
    
    if (!dbWallets || dbWallets.length === 0) {
      console.log('⚠️ No wallets in database, using env config');
      return;
    }
    
    // Group by chain
    const chainGroups = new Map<string, WalletAddress[]>();
    
    dbWallets.forEach((wallet: any) => {
      const existing = chainGroups.get(wallet.chain) || [];
      existing.push({
        id: wallet.id,
        chain: wallet.chain,
        address: wallet.address,
        label: wallet.label,
        isActive: wallet.is_active,
        rotationIndex: wallet.rotation_index,
        createdAt: wallet.created_at,
        lastUsedAt: wallet.last_used_at,
        totalReceived: wallet.total_received || '0',
        status: wallet.status,
      });
      chainGroups.set(wallet.chain, existing);
    });
    
    // Update rotations
    walletRotations = Array.from(chainGroups.entries()).map(([chain, addresses]) => ({
      chain,
      currentIndex: 0,
      addresses: addresses.sort((a, b) => a.rotationIndex - b.rotationIndex),
    }));
    
    console.log(`✅ Loaded ${dbWallets.length} wallets from database`);
  } catch (error) {
    console.log('⚠️ Failed to load wallets from database:', error);
  }
}

// Update wallet usage (for tracking)
export async function markWalletUsed(
  supabaseClient: SupabaseClient,
  chain: string,
  address: string
): Promise<void> {
  try {
    // Get current total
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('total_received')
      .eq('chain', chain)
      .eq('address', address)
      .single();
    
    const newTotal = (wallet?.total_received || 0) + 1;
    
    await supabaseClient
      .from('wallets')
      .update({
        last_used_at: new Date().toISOString(),
        total_received: newTotal,
      })
      .eq('chain', chain)
      .eq('address', address);
  } catch (error) {
    console.log('Failed to update wallet usage:', error);
  }
}

// Get receive address with fallback cascade
export function getReceiveAddressWithFallback(
  chain: string,
  _amount?: string
): { address: string; chain: string; isPrimary: boolean } {
  const currentWallet = getCurrentWallet(chain);
  
  if (!currentWallet) {
    // Try fallback to main chains
    const fallbackChains = ['ETH', 'TRX', 'BTC'];
    for (const fallbackChain of fallbackChains) {
      if (fallbackChain === chain) continue;
      const fallback = getCurrentWallet(fallbackChain);
      if (fallback) {
        return {
          address: fallback.address,
          chain: fallbackChain,
          isPrimary: false,
        };
      }
    }
    
    throw new Error(`No wallet available for chain: ${chain}`);
  }
  
  return {
    address: currentWallet.address,
    chain: currentWallet.chain,
    isPrimary: true,
  };
}

// Validate address format for chain
export function isValidAddress(chain: string, address: string): boolean {
  switch (chain) {
    case 'ETH':
    case 'POL':
    case 'ARB':
    case 'AVAX':
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    case 'BTC':
      return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(address);
    case 'TRX':
      return /^T[a-zA-HJ-NP-Z0-9]{33}$/.test(address);
    case 'SOL':
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    default:
      return address.length > 20;
  }
}
