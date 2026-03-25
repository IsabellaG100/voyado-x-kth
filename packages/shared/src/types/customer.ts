export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tier: LoyaltyTier;
  pointsBalance: number;
  totalSpend: number;
  lastPurchaseDate: string;
  enrollmentDate: string;
  city: string;
  country: string;
  isActive: boolean;
}

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface LoyaltyTierInfo {
  name: LoyaltyTier;
  minPoints: number;
  color: string;
  memberCount: number;
}
