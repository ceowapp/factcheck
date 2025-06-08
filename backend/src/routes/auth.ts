import express from 'express';
import { UserService } from '../services/userService';
import { authLimiter } from '../middleware/rateLimiter';
import { validateUser } from '../middleware/validation';
import { auth } from '../index';

const router = express.Router();
const userService = new UserService();

// Middleware to verify authentication
const authenticateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const uid = await userService.verifyToken(token);
    req.user = { uid };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Register new user
router.post('/register', authLimiter, validateUser, async (req, res) => {
  try {
    const { email, password, displayName, photoURL } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      photoURL,
    });

    // Create user in Firestore
    const user = await userService.createUser(userRecord.uid, email, displayName, photoURL);

    // Create custom token for client
    const token = await userService.createCustomToken(userRecord.uid);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login user
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in with Firebase Auth
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = await userService.getUser(userCredential.user.uid);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update last login
    await userService.updateUserActivity(userCredential.user.uid);

    // Create custom token
    const token = await userService.createCustomToken(userCredential.user.uid);

    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout user
router.post('/logout', authenticateUser, async (req, res) => {
  try {
    // Firebase handles token invalidation
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Refresh token
router.post('/refresh-token', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const uid = await userService.verifyToken(token);
    const user = await userService.getUser(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newToken = await userService.createCustomToken(uid);
    res.json({ user, token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Forgot password
router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    await userService.sendPasswordResetEmail(email);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
});

// Reset password
router.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decodedToken = await auth.verifyIdToken(token);
    await userService.changePassword(decodedToken.uid, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Verify email
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await auth.verifyIdToken(token);
    await userService.verifyEmail(decodedToken.uid);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

// Google login
router.post('/google', authLimiter, async (req, res) => {
  try {
    const { idToken, accessToken, user: googleUser } = req.body;
    
    // Verify Google token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Get or create user
    let user = await userService.getUser(decodedToken.uid);
    if (!user) {
      user = await userService.createUser(
        decodedToken.uid,
        googleUser.email,
        googleUser.displayName,
        googleUser.photoURL
      );
    }

    // Create custom token
    const token = await userService.createCustomToken(decodedToken.uid);
    
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

// Change password
router.post('/change-password', authenticateUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(req.user.uid, newPassword);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Update profile
router.put('/profile', authenticateUser, validateUser, async (req, res) => {
  try {
    const { displayName, photoURL } = req.body;
    await userService.updateUser(req.user.uid, { displayName, photoURL });
    const updatedUser = await userService.getUser(req.user.uid);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Delete account
router.delete('/account', authenticateUser, async (req, res) => {
  try {
    await userService.deleteUser(req.user.uid);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// Get current user
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = await userService.getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user preferences
router.put('/me/preferences', authenticateUser, async (req, res) => {
  try {
    const { preferences } = req.body;
    await userService.updatePreferences(req.user.uid, preferences);
    const updatedUser = await userService.getUser(req.user.uid);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Search users
router.get('/search', authenticateUser, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const users = await userService.searchUsers(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search users' });
  }
});

export default router; 