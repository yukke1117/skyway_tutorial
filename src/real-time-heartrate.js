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

// 最新のデータを取得（リアルタイム更新）
const q = query(collection(db, "new_heart_rate"), orderBy("timestamp", "desc"), limit(1));
onSnapshot(q, (snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log("取得したデータ:", data); // デバッグ用
    document.getElementById("heart-rate").innerText = `${data.heart_rate} BPM`;
  });
});
