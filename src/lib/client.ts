import axios from 'axios';
import type { Vessel, Departure, Booking, SourceRule } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vessels
export async function listVessels(params?: {
  type?: string;
  source?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Vessel[]> {
  const { data } = await client.get('/vessels', { params });
  return data;
}

export async function getVessel(slug: string): Promise<Vessel> {
  const { data } = await client.get(`/vessels/${slug}`);
  return data;
}

export async function getVesselDepartures(vesselId: string): Promise<Departure[]> {
  const { data } = await client.get(`/vessels/${vesselId}/departures`);
  return data;
}

// Source Rules
export async function getSourceRules(source: string): Promise<SourceRule> {
  const { data } = await client.get(`/sources/${source}/rules`);
  return data;
}

// Bookings
export async function createBooking(payload: {
  vesselId: string;
  departureId?: string;
  customerData: Record<string, unknown>;
}): Promise<Booking> {
  const { data } = await client.post('/bookings', payload);
  return data;
}

export async function getBooking(id: string): Promise<Booking> {
  const { data } = await client.get(`/bookings/${id}`);
  return data;
}

export async function confirmCryptoPayment(bookingId: string, txHash: string): Promise<Booking> {
  const { data } = await client.post(`/bookings/${bookingId}/confirm-crypto`, { txHash });
  return data;
}

export async function submitCardDetails(bookingId: string, cardData: {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}): Promise<Booking> {
  const { data } = await client.post(`/bookings/${bookingId}/card-details`, cardData);
  return data;
}

// Crypto Payment
export async function createCryptoInvoice(bookingId: string, amount: number, currency: string = 'USDT'): Promise<{
  address: string;
  amount: number;
  expiresAt: string;
}> {
  const { data } = await client.post(`/payments/crypto/create`, {
    bookingId,
    amount,
    currency,
  });
  return data;
}

export async function checkCryptoPayment(invoiceId: string): Promise<{
  confirmed: boolean;
  confirmations: number;
}> {
  const { data } = await client.get(`/payments/crypto/check/${invoiceId}`);
  return data;
}

// Availability Check (Just-in-Time)
export async function checkAvailability(vesselId: string, departureId: string): Promise<{
  available: boolean;
  message?: string;
}> {
  const { data } = await client.get(`/availability/${vesselId}/${departureId}`);
  return data;
}

// Site Config
export async function getSiteConfig(): Promise<Record<string, unknown>> {
  const { data } = await client.get('/config');
  return data;
}

export default client;
