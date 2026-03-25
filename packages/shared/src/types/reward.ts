export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: RewardCategory;
  imageUrl: string;
  available: boolean;
  stock: number;
}

export type RewardCategory = 'discount' | 'product' | 'experience';

export interface Redemption {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsSpent: number;
  redeemedDate: string;
  customerId: string;
}
