import { db } from '../index';
import { Claim, Evidence, ClaimVerification } from '../models/Claim';

export class FactCheckService {
  private claimsCollection = db.collection('claims');
  private verificationsCollection = db.collection('verifications');

  async createClaim(claim: Omit<Claim, 'id' | 'createdAt' | 'updatedAt'>): Promise<Claim> {
    const now = new Date();
    const newClaim: Claim = {
      ...claim,
      id: this.claimsCollection.doc().id,
      createdAt: now,
      updatedAt: now,
    };

    await this.claimsCollection.doc(newClaim.id).set(newClaim);
    return newClaim;
  }

  async getClaim(claimId: string): Promise<Claim | null> {
    const doc = await this.claimsCollection.doc(claimId).get();
    return doc.exists ? (doc.data() as Claim) : null;
  }

  async addEvidence(claimId: string, evidence: Omit<Evidence, 'id' | 'addedAt'>): Promise<Evidence> {
    const claimRef = this.claimsCollection.doc(claimId);
    const evidenceId = this.claimsCollection.doc().id;
    const newEvidence: Evidence = {
      ...evidence,
      id: evidenceId,
      addedAt: new Date(),
    };

    await claimRef.update({
      evidence: db.FieldValue.arrayUnion(newEvidence),
      updatedAt: new Date(),
    });

    return newEvidence;
  }

  async verifyClaim(verification: ClaimVerification): Promise<void> {
    const claimRef = this.claimsCollection.doc(verification.claimId);
    const verificationRef = this.verificationsCollection.doc();

    await db.runTransaction(async (transaction) => {
      const claimDoc = await transaction.get(claimRef);
      if (!claimDoc.exists) {
        throw new Error('Claim not found');
      }

      const claim = claimDoc.data() as Claim;
      transaction.update(claimRef, {
        status: 'verified',
        verificationScore: verification.confidence,
        updatedAt: new Date(),
      });

      transaction.set(verificationRef, verification);
    });
  }

  async searchClaims(query: string): Promise<Claim[]> {
    const snapshot = await this.claimsCollection
      .where('content', '>=', query)
      .where('content', '<=', query + '\uf8ff')
      .get();

    return snapshot.docs.map(doc => doc.data() as Claim);
  }

  async getClaimsByStatus(status: Claim['status']): Promise<Claim[]> {
    const snapshot = await this.claimsCollection
      .where('status', '==', status)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => doc.data() as Claim);
  }
} 