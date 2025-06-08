import express from 'express';
import { FactCheckService } from '../services/factCheckService';
import { auth } from '../index';
import { Claim, Evidence } from '../models/Claim';

const router = express.Router();
const factCheckService = new FactCheckService();

// Middleware to verify authentication
const authenticateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create a new claim
router.post('/claims', authenticateUser, async (req, res) => {
  try {
    const claim = await factCheckService.createClaim({
      ...req.body,
      createdBy: req.user.uid,
    });
    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create claim' });
  }
});

// Get a specific claim
router.get('/claims/:id', async (req, res) => {
  try {
    const claim = await factCheckService.getClaim(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch claim' });
  }
});

// Add evidence to a claim
router.post('/claims/:id/evidence', authenticateUser, async (req, res) => {
  try {
    const evidence = await factCheckService.addEvidence(req.params.id, {
      ...req.body,
      addedBy: req.user.uid,
    });
    res.status(201).json(evidence);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add evidence' });
  }
});

// Verify a claim
router.post('/claims/:id/verify', authenticateUser, async (req, res) => {
  try {
    await factCheckService.verifyClaim({
      claimId: req.params.id,
      verifiedBy: req.user.uid,
      verifiedAt: new Date(),
      ...req.body,
    });
    res.status(200).json({ message: 'Claim verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify claim' });
  }
});

// Search claims
router.get('/claims/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const claims = await factCheckService.searchClaims(query);
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search claims' });
  }
});

// Get claims by status
router.get('/claims/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    if (!['pending', 'verified', 'disputed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const claims = await factCheckService.getClaimsByStatus(status as Claim['status']);
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
});

export default router; 