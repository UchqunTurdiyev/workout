import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDNq6qYqDAjrPs_EoCCpVCeJhI5bXi5N7I',
	authDomain: 'gym-training-a1d80.firebaseapp.com',
	projectId: 'gym-training-a1d80',
	storageBucket: 'gym-training-a1d80.appspot.com',
	messagingSenderId: '451176911491',
	appId: '1:451176911491:web:3fbbdae523f028930281b6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
