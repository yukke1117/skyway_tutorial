import firebase_admin
from firebase_admin import credentials, firestore
import random

# Firebaseの初期化（既に初期化済みならスキップ）
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Firestoreに保存するデータ
data = {
    "heart_rate": random.randint(60, 100),  # ダミーの心拍数
    "timestamp": firestore.SERVER_TIMESTAMP
}

# 新しいコレクション "new_heart_rate" にデータを追加
db.collection("new_heart_rate").add(data)

print("Firestoreに新しいデータを追加しました！（コレクション: new_heart_rate）")
