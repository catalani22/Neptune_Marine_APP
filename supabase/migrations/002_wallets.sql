-- Add wallets and crypto transactions tables
-- Run in Supabase SQL Editor

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  chain VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  label TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  rotation_index INT DEFAULT 0,
  total_received INT DEFAULT 0,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active',
  UNIQUE(chain, address)
);

-- Create crypto_transactions table
CREATE TABLE IF NOT EXISTS crypto_transactions (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id VARCHAR(255) REFERENCES wallets(id) ON DELETE CASCADE,
  tx_hash VARCHAR(255) UNIQUE NOT NULL,
  from_address TEXT,
  amount TEXT NOT NULL,
  currency VARCHAR(50) NOT NULL,
  chain VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  confirmations INT DEFAULT 0,
  block_number INT,
  block_timestamp TIMESTAMP,
  booking_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_wallets_chain_active ON wallets(chain, is_active);
CREATE INDEX IF NOT EXISTS idx_crypto_wallet_status ON crypto_transactions(wallet_id, status);
CREATE INDEX IF NOT EXISTS idx_crypto_booking ON crypto_transactions(booking_id);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_transactions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read wallets" ON wallets FOR SELECT USING (true);
CREATE POLICY "Public read transactions" ON crypto_transactions FOR SELECT USING (true);

-- Insert sample wallet config (replace with actual addresses)
-- These are placeholder addresses - REPLACE WITH YOUR ACTUAL WALLETS
INSERT INTO wallets (chain, address, label, rotation_index) VALUES
  ('ETH', '0x742d35Cc6634C0532925a3b844Bc9e7595f1bD00', 'ETH Primary 1', 0),
  ('ETH', '0x8Ba1f109551bD432803012645Ac136ddd64DBA72', 'ETH Primary 2', 1),
  ('ETH', '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720', 'ETH Primary 3', 2),
  ('TRX', 'TDPBRDmZ3EKG2SmmtS2FArERrM7r6SPaqS', 'TRX Primary 1', 0),
  ('TRX', 'TJr32DbLLbJmP6CqefUz4xWVTyJ9ZQx8qZ', 'TRX Primary 2', 1),
  ('TRX', 'TVrjKsaEPfRzwgY6mF5Xf2vX3r7wQWJ8mJ', 'TRX Primary 3', 2),
  ('BTC', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'BTC Primary', 0),
  ('SOL', 'DYw1R51nFGY6mFXY6mF5Xf2vX3r7wQWJ8mJ', 'SOL Primary 1', 0),
  ('SOL', '9RXY2KGdyGJRSQTzQ2N0YRF2493P83KKFJHX0WLH', 'SOL Primary 2', 1),
  ('BSC', '0x742d35Cc6634C0532925a3b844Bc9e7595f1bD00', 'BSC Primary 1', 0),
  ('POL', '0x742d35Cc6634C0532925a3b844Bc9e7595f1bD00', 'POL Primary 1', 0),
  ('AVAX', '0x742d35Cc6634C0532925a3b844Bc9e7595f1bD00', 'AVAX Primary 1', 0),
  ('ARB', '0x742d35Cc6634C0532925a3b844Bc9e7595f1bD00', 'ARB Primary 1', 0)
ON CONFLICT (chain, address) DO NOTHING;

-- Update site_config with default crypto settings
UPDATE site_config 
SET 
  crypto_gateway = 'internal',
  wallet_address = '0x742d35Cc6634C0532925a3b844Bc9e7595f1bD00'
WHERE id = (SELECT id FROM site_config LIMIT 1);
