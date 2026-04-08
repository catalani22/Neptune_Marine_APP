import { Router } from 'express';
import { 
  getCurrentWallet, 
  rotateWallet, 
  getReceiveAddressWithFallback,
  getAllWallets,
  getActiveChains,
  SUPPORTED_CHAINS,
  isValidAddress 
} from '../lib/wallets';
import {
  getPaymentInfo,
  getPaymentInstructions,
  CHAIN_TOKENS,
  getSupportedCurrencies,
  checkPaymentStatus,
} from '../lib/crypto';

const router = Router();

// Get all supported chains
router.get('/chains', (req, res) => {
  const chains = getActiveChains().map(chain => ({
    id: chain,
    name: SUPPORTED_CHAINS[chain].name,
    symbol: SUPPORTED_CHAINS[chain].symbol,
    explorerUrl: SUPPORTED_CHAINS[chain].explorerUrl,
    tokens: CHAIN_TOKENS[chain] || [],
  }));
  
  res.json({ chains });
});

// Get wallet for specific chain (with rotation)
router.get('/wallet/:chain', (req, res) => {
  const { chain } = req.params;
  const wallet = getCurrentWallet(chain.toUpperCase());
  
  if (!wallet) {
    return res.status(404).json({ 
      error: 'No wallet available for this chain',
      availableChains: getActiveChains(),
    });
  }
  
  res.json({
    chain: wallet.chain,
    address: wallet.address,
    label: wallet.label,
    rotationIndex: wallet.rotationIndex,
  });
});

// Get receive address with fallback cascade
router.post('/receive', (req, res) => {
  const { chain, currency, amount } = req.body;
  
  try {
    const result = getReceiveAddressWithFallback(chain?.toUpperCase() || 'ETH', amount);
    
    res.json({
      address: result.address,
      chain: result.chain,
      isPrimary: result.isPrimary,
      paymentInfo: getPaymentInfo(result.chain, currency || 'USDT'),
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get payment instructions
router.post('/instructions', (req, res) => {
  const { chain, currency, amount } = req.body;
  
  if (!chain || !currency || !amount) {
    return res.status(400).json({ 
      error: 'Missing required fields: chain, currency, amount',
    });
  }
  
  try {
    const instructions = getPaymentInstructions(
      chain.toUpperCase(),
      currency.toUpperCase(),
      amount
    );
    
    const paymentInfo = getPaymentInfo(chain.toUpperCase(), currency.toUpperCase());
    
    res.json({
      instructions,
      paymentInfo,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Rotate wallet manually (for testing/admin)
router.post('/rotate/:chain', (req, res) => {
  const { chain } = req.params;
  
  const previousWallet = getCurrentWallet(chain.toUpperCase());
  const nextWallet = rotateWallet(chain.toUpperCase());
  
  if (!nextWallet) {
    return res.status(404).json({ 
      error: 'No wallet available for this chain',
    });
  }
  
  res.json({
    previous: previousWallet?.address,
    current: nextWallet.address,
    chain: chain.toUpperCase(),
  });
});

// Get all wallets (admin)
router.get('/wallets', (req, res) => {
  const wallets = getAllWallets();
  
  res.json({
    wallets: wallets.map(w => ({
      chain: w.chain,
      currentIndex: w.currentIndex,
      addresses: w.addresses.map(a => ({
        address: a.address,
        label: a.label,
        rotationIndex: a.rotationIndex,
        isActive: a.isActive,
      })),
    })),
  });
});

// Check payment status
router.get('/status/:txHash', async (req, res) => {
  const { txHash } = req.params;
  const { chain = 'ETH' } = req.query;
  
  try {
    const status = await checkPaymentStatus(txHash, chain as string);
    res.json(status);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Validate address
router.get('/validate/:chain/:address', (req, res) => {
  const { chain, address } = req.params;
  
  const isValid = isValidAddress(chain.toUpperCase(), address);
  
  res.json({
    chain: chain.toUpperCase(),
    address,
    isValid,
  });
});

// Supported currencies
router.get('/currencies', (req, res) => {
  res.json({
    currencies: getSupportedCurrencies(),
  });
});

export default router;
