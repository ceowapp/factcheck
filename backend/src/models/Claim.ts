export interface Claim {
  id: string;
  content: string;
  source: string;
  timestamp: number;
  status: 'pending' | 'verified' | 'disputed';
  verificationScore: number;
  evidence: Evidence[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Evidence {
  id: string;
  type: 'text' | 'image' | 'video' | 'link';
  content: string;
  source: string;
  reliability: number;
  addedBy: string;
  addedAt: Date;
}

export interface ClaimVerification {
  claimId: string;
  verifiedBy: string;
  verifiedAt: Date;
  method: 'manual' | 'ai' | 'hybrid';
  confidence: number;
  notes?: string;
} 