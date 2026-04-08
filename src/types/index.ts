export type Source = 
  | 'BURGESS' 
  | 'ZIZOO' 
  | 'NAUTAL' 
  | 'GLOBESAILOR' 
  | 'CLICKANDBOAT' 
  | 'YACHTWORLD' 
  | 'BOAT24' 
  | 'DREAM_YACHT'
  | 'SEVEN_STARS'
  | 'GLOBALCHARTER';

export type ServiceType = 'CABIN_CHAPTER' | 'FULL_CHARTER' | 'SALE';

export type BookingStatus = 
  | 'PENDING_CRYPTO' 
  | 'AWAITING_CARD' 
  | 'CONFIRMED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export interface VesselSpecs {
  length?: number;
  beam?: number;
  draft?: number;
  year?: number;
  engines?: string;
  speed?: number;
  cabins?: number;
  guests?: number;
  crew?: number;
}

export interface Vessel {
  id: string;
  type: ServiceType;
  source: Source;
  externalId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  specs?: VesselSpecs;
  location?: string;
  region?: string;
  departurePort?: string;
  arrivalPort?: string;
  images: string[];
  videos?: string[];
  basePrice: number;
  currency: string;
  urlOriginal: string;
  updatedAt: string;
}

export interface Departure {
  id: string;
  vesselId: string;
  externalId: string;
  departureDate: string;
  arrivalDate?: string;
  totalCabins?: number;
  availableCabins?: number;
  status: 'available' | 'limited' | 'sold_out';
  cabinPrices?: Record<string, number>;
  itinerary?: string;
  route?: string;
}

export interface SourceRule {
  source: Source;
  depositPercentage: number;
  paymentTiming: 'immediate' | '30_days' | 'embarkation';
  requiresCard: boolean;
  cancellationPolicy?: string;
  termsUrl?: string;
  formFields?: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
}

export interface Booking {
  id: string;
  vesselId: string;
  departureId?: string;
  status: BookingStatus;
  depositAmount: number;
  depositCurrency: string;
  cryptoTxHash?: string;
  paidAt?: string;
  customerData: Record<string, unknown>;
  sourceBookingId?: string;
  sourceConfirmedAt?: string;
  checkoutExpires?: string;
  createdAt: string;
}

export interface CheckoutState {
  step: 'select' | 'crypto_payment' | 'card_details' | 'confirmation';
  vessel?: Vessel;
  departure?: Departure;
  bookingId?: string;
  depositAmount?: number;
}
