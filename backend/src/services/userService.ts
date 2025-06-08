import { auth, db } from '../index';
import { User, UserPreferences, UserStats, SocialLinks, Subscription } from '../models/User';
import { getAuth } from 'firebase-admin/auth';

export class UserService {
  private usersCollection = db.collection('users');

  async createUser(uid: string, email: string, displayName: string, photoURL?: string): Promise<User> {
    const now = new Date();
    const newUser: User = {
      uid,
      email,
      displayName,
      photoURL,
      role: 'user',
      reputation: 0,
      createdAt: now,
      lastLogin: now,
      emailVerified: false,
      isActive: true,
      preferences: {
        emailNotifications: true,
        pushNotifications: true,
        language: 'en',
        theme: 'system',
      },
      stats: {
        claimsSubmitted: 0,
        claimsVerified: 0,
        evidenceProvided: 0,
        commentsCount: 0,
        likesReceived: 0,
      },
      subscription: {
        plan: 'free',
        status: 'active',
        startDate: now,
        features: ['basic_factcheck', 'basic_analytics'],
      },
    };

    await this.usersCollection.doc(uid).set(newUser);
    return newUser;
  }

  async getUser(uid: string): Promise<User | null> {
    const doc = await this.usersCollection.doc(uid).get();
    return doc.exists ? (doc.data() as User) : null;
  }

  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    await this.usersCollection.doc(uid).update({
      ...data,
      lastLogin: new Date(),
    });
  }

  async updatePreferences(uid: string, preferences: Partial<UserPreferences>): Promise<void> {
    await this.usersCollection.doc(uid).update({
      'preferences': preferences,
    });
  }

  async updateStats(uid: string, stats: Partial<UserStats>): Promise<void> {
    await this.usersCollection.doc(uid).update({
      'stats': stats,
    });
  }

  async updateSocialLinks(uid: string, socialLinks: SocialLinks): Promise<void> {
    await this.usersCollection.doc(uid).update({
      'socialLinks': socialLinks,
    });
  }

  async updateSubscription(uid: string, subscription: Partial<Subscription>): Promise<void> {
    await this.usersCollection.doc(uid).update({
      'subscription': subscription,
    });
  }

  async updateReputation(uid: string, points: number): Promise<void> {
    const userRef = this.usersCollection.doc(uid);
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User not found');
      }
      const user = userDoc.data() as User;
      transaction.update(userRef, {
        reputation: user.reputation + points,
      });
    });
  }

  async deleteUser(uid: string): Promise<void> {
    await auth.deleteUser(uid);
    await this.usersCollection.doc(uid).delete();
  }

  async verifyToken(token: string): Promise<string> {
    try {
      const decodedToken = await auth.verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async createCustomToken(uid: string): Promise<string> {
    return auth.createCustomToken(uid);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const snapshot = await this.usersCollection.where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data() as User;
  }

  async searchUsers(query: string): Promise<User[]> {
    const snapshot = await this.usersCollection
      .where('displayName', '>=', query)
      .where('displayName', '<=', query + '\uf8ff')
      .limit(10)
      .get();

    return snapshot.docs.map(doc => doc.data() as User);
  }

  async verifyEmail(uid: string): Promise<void> {
    await auth.updateUser(uid, { emailVerified: true });
    await this.usersCollection.doc(uid).update({ emailVerified: true });
  }

  async changePassword(uid: string, newPassword: string): Promise<void> {
    await auth.updateUser(uid, { password: newPassword });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await auth.generatePasswordResetLink(email);
  }

  async updateUserActivity(uid: string): Promise<void> {
    await this.usersCollection.doc(uid).update({
      lastLogin: new Date(),
    });
  }

  async getUserActivity(uid: string): Promise<any> {
    // Implement user activity tracking
    return {};
  }

  async getUserNotifications(uid: string): Promise<any[]> {
    // Implement user notifications
    return [];
  }

  async updateNotificationPreferences(uid: string, preferences: any): Promise<void> {
    await this.usersCollection.doc(uid).update({
      'preferences.notifications': preferences,
    });
  }
} 