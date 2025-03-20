function getHeartRate() {
    let heartRateText = document.getElementById("heart-rate").innerText; // 例: "95 bpm"
    let heartRate = parseInt(heartRateText.replace(" bpm", ""), 10); // "95 bpm" → 95 に変換
    return isNaN(heartRate) ? null : heartRate;
}

// 心拍数グラフのキャンバス要素を修正（correlationChart ではなく heartRateChart に変更）
let ctxHeart = document.getElementById('correlationChart').getContext('2d');

// グラフオブジェクトの作成
let heartRateChart = new Chart(ctxHeart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Heart Rate (BPM)',
            data: [],
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: "black"
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Time (s)", color: "black" } },
            y: { title: { display: true, text: "Heart Rate (BPM)", color: "black" }, min: 50, max: 150 }
        },
        plugins: {
            legend: { display: true }
        }
    }
});

// 1秒ごとに心拍数を取得してグラフを更新
setInterval(() => {
    let heartRate = getHeartRate();
    if (heartRate !== null) {
        let currentTime = new Date().toLocaleTimeString(); // 現在の時刻
        heartRateChart.data.labels.push(currentTime);
        heartRateChart.data.datasets[0].data.push(heartRate);
        
        // データ数が多くなりすぎたら、古いデータを削除
        if (heartRateChart.data.labels.length > 50) {
            heartRateChart.data.labels.shift();
            heartRateChart.data.datasets[0].data.shift();
        }
        
        heartRateChart.update();

        console.log(`Heart Rate Updated: ${heartRate} BPM at ${currentTime}`);

        // 心拍数の解析
        let analysis = analyzeHeartRate(heartRate);
        console.log("Heart Rate Analysis:", analysis);
    }
}, 1000);

// 心拍数の解析関数
function analyzeHeartRate(heartRate) {
    if (heartRate < 60) return "Low Heart Rate";
    if (heartRate > 100) return "High Heart Rate";
    return "Normal Heart Rate";
}
