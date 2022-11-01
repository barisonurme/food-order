// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUDGED,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const storage = getStorage(app);

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    switch (error.code) {
      case 'auth/weak-password':
        break;

      default:
        break;
    }
  }
};

export const db = getFirestore(app);

export const dataTest = async (
  mealName,
  mealIngredients,
  mealPrices,
  uploadImageUrl,
  uploadImageName,
) => {
  try {
    const docRef = await addDoc(collection(db, 'Meals'), {
      mealName,
      mealIngredients,
      mealPrices,
      uploadImageUrl,
      uploadImageName,
    });
  } catch (error) {
  }
};

export const bannerUpload = async (bannerName, bannerUrl, bannerLink) => {
  try {
    await addDoc(collection(db, 'bannerImages'), {
      bannerName,
      bannerUrl,
      bannerLink,
    });
  } catch (error) {
    console.log('Error: ' + error);
  }
};
