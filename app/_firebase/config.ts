import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyB28w3A6sgusTqulfml8Qj-HP6ngUjFjw8',
  authDomain: 'happystore-3e775.firebaseapp.com',
  projectId: 'happystore-3e775',
  storageBucket: 'happystore-3e775.appspot.com',
  messagingSenderId: '885195820421',
  appId: '1:885195820421:web:034c03adee76790fa148ec',
  measurementId: 'G-FC3JP0VZ8F',
}
let app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
export { db, auth, storage }
