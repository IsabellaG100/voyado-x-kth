export interface Segment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  rules: SegmentRule[];
  createdDate: string;
  lastUpdated: string;
}

export interface SegmentRule {
  id: string;
  field: string;
  operator: SegmentOperator;
  value: string | number;
}

export type SegmentOperator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'between';
