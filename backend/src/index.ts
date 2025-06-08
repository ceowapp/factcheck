import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { createSuccessResponse, createErrorResponse } from '@factcheck-video-analyzer/shared';
import { videoRoutes } from './routes/video';
import { authRoutes } from './routes/auth';
import { snippetRoutes } from './routes/snippet';
import { factCheckRoutes } from './routes/factCheck';
import { noteRoutes } from './routes/note';
import { subscriptionRoutes } from './routes/subscription';

// Initialize Firebase Admin
const app = initializeApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Create Express app
const server = express();

// Middleware
server.use(cors({ origin: true }));
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

// Health check endpoint
server.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Import routes
import userRoutes from './routes/user';
import claimRoutes from './routes/claim';

// Use routes
server.use('/api/fact-check', factCheckRoutes);
server.use('/api/users', userRoutes);
server.use('/api/claims', claimRoutes);

// Routes
server.use('/api/video', videoRoutes);
server.use('/api/auth', authRoutes);
server.use('/api/snippet', snippetRoutes);
server.use('/api/note', noteRoutes);
server.use('/api/subscription', subscriptionRoutes);

// Error handling middleware
server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(server);

// Export other Firebase Functions
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    const userService = new UserService();
    await userService.createUser(
      user.uid,
      user.email || '',
      user.displayName || '',
      user.photoURL
    );
  } catch (error) {
    console.error('Error creating user:', error);
  }
});

export const onUserDeleted = functions.auth.user().onDelete(async (user) => {
  try {
    const userService = new UserService();
    await userService.deleteUser(user.uid);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
});

// Export Firestore triggers
export const onClaimCreated = functions.firestore
  .document('claims/{claimId}')
  .onCreate(async (snap, context) => {
    try {
      const claim = snap.data();
      const userService = new UserService();
      await userService.updateStats(claim.createdBy, {
        claimsSubmitted: 1
      });
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  });

export const onClaimVerified = functions.firestore
  .document('claims/{claimId}')
  .onUpdate(async (change, context) => {
    try {
      const newData = change.after.data();
      const previousData = change.before.data();

      if (newData.status === 'verified' && previousData.status !== 'verified') {
        const userService = new UserService();
        await userService.updateStats(newData.verifiedBy, {
          claimsVerified: 1
        });
      }
    } catch (error) {
      console.error('Error updating verifier stats:', error);
    }
  }); 