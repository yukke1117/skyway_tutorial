import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyAN8tzI2uEgxqgzcehRmqgbSRacyAFC-tk",
  authDomain: "cyoreal-d495b.firebaseapp.com",
  projectId: "cyoreal-d495b",
  storageBucket: "cyoreal-d495b.firebasestorage.app",
  messagingSenderId: "552827619255",
  appId: "1:552827619255:web:e768a2e7c1c56cf5f88a32",
  measurementId: "G-E99F8Y6NRX"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// new_heart_rate の最新データを取得
const q1 = query(collection(db, "new_heart_rate"), orderBy("timestamp", "desc"), limit(1));
onSnapshot(q1, (snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log("new_heart_rate のデータ:", data); // デバッグ用
    document.getElementById("heart-rate1").innerText = `${data.heart_rate} bpm`;
  });
});

// new_heart_rate2 の最新データを取得
const q2 = query(collection(db, "new_heart_rate_add"), orderBy("timestamp", "desc"), limit(1));
onSnapshot(q2, (snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log("new_heart_rate2 のデータ:", data); // デバッグ用
    document.getElementById("heart-rate2").innerText = `${data.heart_rate} bpm`;
  });
});
