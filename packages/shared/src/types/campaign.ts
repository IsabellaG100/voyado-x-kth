export interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  scheduledDate: string;
  audienceSize: number;
  templateId: string;
  subject?: string;
  content?: string;
}

export type CampaignChannel = 'email' | 'sms' | 'push';
export type CampaignStatus = 'draft' | 'scheduled' | 'sent' | 'paused';

export interface CampaignTemplate {
  id: string;
  name: string;
  channel: CampaignChannel;
  thumbnailUrl: string;
  layout: string;
}
