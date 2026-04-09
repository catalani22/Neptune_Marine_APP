import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
  BASE: {
    id: 'BASE',
    name: 'Base',
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://basescan.org',
    isActive: true,
  },
  SUI: {
    id: 'SUI',
    name: 'Sui',
    symbol: 'SUI',
    decimals: 9,
    explorerUrl: 'https://suiscan.xyz',
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

// ============= WALLET CONFIGURATION =============
// SECURITY: These addresses are hardcoded and cannot be changed through the application
// Only the owner can modify these by updating the source code
// These wallets are used for crypto payments with automatic rotation/fallback

const WALLET_ADDRESSES = {
  // EVM chains (ETH, BSC, POL, ARB, AVAX, BASE) - all use the same 3 wallets in rotation
  ETH: [
    '0xB86065255D3e94aCAD3cF627092EaC745b6aB81D',
    '0xEb85043b4b3f08964C0fDF00d76Ca354Aed467C8',
    '0x6C9cA01cdC692fE92f2F6b3ad33d2C4034c9B32c',
  ],
  // Solana - 3 wallets in rotation
  SOL: [
    'AsKFa7SrCXgeExV6wTwPD1waX6W1sKCrfveaWQjWRe7T',
    'AH9aZN3QyCfNeyxDQZwvk9KeiKSBGx6ZShMZpEmXxWH1',
    'DZSowZNgwgExUsdJyG6fhNN2J4A4uiLVc8tvo8M6EoLe',
  ],
  // Sui - 3 wallets in rotation
  SUI: [
    '0xe1adce87dd8dee1d6755187a7e4f9efe52c16785c0c063cadecb45770283412a',
    '0x4b9a9e387cde9edcee4e47ed4a42190f90a0853572bb0f1a1921805851e2272e',
    '0xf3916f9dd6b27b4632f3f969046cf7895e168ed72b80a6c40e2e4c568a6cb6f5',
  ],
  // Bitcoin - only 1 wallet for now (more coming soon)
  BTC: [
    'bc1qhq3vkydx43rtjlkuxk2ag53gac4lhnugweu870',
  ],
} as const;

// ============= END WALLET CONFIG =============

// Default wallet rotation from hardcoded config
function getDefaultWallets(): WalletRotation[] {
  const wallets: WalletRotation[] = [];
  
  // EVM chains (ETH, BSC, POL, ARB, AVAX, BASE) - share same wallets
  const evmChains = ['ETH', 'BSC', 'POL', 'ARB', 'AVAX', 'BASE'];
  
  for (const chain of evmChains) {
    wallets.push({
      chain,
      currentIndex: 0,
      addresses: WALLET_ADDRESSES.ETH.map((address, i) => ({
        id: `${chain.toLowerCase()}-${i}`,
        chain,
        address,
        label: `${chain} Wallet ${i + 1}`,
        isActive: true,
        rotationIndex: i,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        totalReceived: '0',
        status: 'active',
      })),
    });
  }
  
  // Solana
  wallets.push({
    chain: 'SOL',
    currentIndex: 0,
    addresses: WALLET_ADDRESSES.SOL.map((address, i) => ({
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
  
  // Sui
  wallets.push({
    chain: 'SUI',
    currentIndex: 0,
    addresses: WALLET_ADDRESSES.SUI.map((address, i) => ({
      id: `sui-${i}`,
      chain: 'SUI',
      address,
      label: `SUI Wallet ${i + 1}`,
      isActive: true,
      rotationIndex: i,
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      totalReceived: '0',
      status: 'active',
    })),
  });
  
  // Bitcoin
  wallets.push({
    chain: 'BTC',
    currentIndex: 0,
    addresses: WALLET_ADDRESSES.BTC.map((address, i) => ({
      id: `btc-${i}`,
      chain: 'BTC',
      address,
      label: `BTC Wallet ${i + 1}`,
      isActive: true,
      rotationIndex: i,
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      totalReceived: '0',
      status: 'active',
    })),
  });
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
