import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // Get this from your Firebase Console
    webClientId: 'YOUR_WEB_CLIENT_ID', // Get this from Firebase Console
    // If you're using iOS, you'll need this
    iosClientId: 'YOUR_IOS_CLIENT_ID', // Get this from Firebase Console
  });
}; 