import firebase_admin
from firebase_admin import credentials, firestore
import random
import time

# Firebaseの初期化（既に初期化済みならスキップ）
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# データを継続的に保存するループ
while True:
    # Firestoreに保存するデータ
    data = {
        "heart_rate": random.randint(60, 100),
        "timestamp": firestore.SERVER_TIMESTAMP  # タイムスタンプを適用
    }

    data2 = {
        "heart_rate": random.randint(60, 100),
        "timestamp": firestore.SERVER_TIMESTAMP  # タイムスタンプを適用
    }

    # Firestoreにデータを追加
    db.collection("new_heart_rate").add(data)
    db.collection("new_heart_rate_add").add(data2)

    print("Firestoreに新しいデータを追加しました！（コレクション: new_heart_rate）")

    # 5秒ごとにデータを追加
    time.sleep(1)
