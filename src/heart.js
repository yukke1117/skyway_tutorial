function getHeartRate() {
    let heartRateText = document.getElementById("heart-rate1").innerText; // 例: "95 bpm"
    let heartRate = parseInt(heartRateText.replace(" bpm", ""), 10); // "95 bpm" → 95 に変換
    return isNaN(heartRate) ? null : heartRate;
}

function calculateCorrelation(xArray, yArray) {
    if (xArray.length !== yArray.length || xArray.length === 0) {
        return null;
    }

    let n = xArray.length;
    let sumX = xArray.reduce((a, b) => a + b, 0);
    let sumY = yArray.reduce((a, b) => a + b, 0);
    let sumXY = xArray.map((x, i) => x * yArray[i]).reduce((a, b) => a + b, 0);
    let sumX2 = xArray.map(x => x * x).reduce((a, b) => a + b, 0);
    let sumY2 = yArray.map(y => y * y).reduce((a, b) => a + b, 0);

    let numerator = (n * sumXY) - (sumX * sumY);
    let denominator = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));

    return denominator === 0 ? 0 : numerator / denominator;
}

// データ格納用
let heartRateData = [];
let maxCorrelationData = [];
let timeLabels = [];

// グラフのセットアップ
let ctx = document.getElementById('correlationChart').getContext('2d');
let correlationChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: heartRateData,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: "black"
            },
            {
                label: 'Max Correlation',
                data: maxCorrelationData,
                borderColor: 'red',
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: "black"
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Time (s)", color: "black" } },
            y: { title: { display: true, text: "Value", color: "black" }, min: -1, max: 1 }
        },
        plugins: {
            legend: { display: true }
        }
    }
});

// 1秒ごとにデータを更新
setInterval(() => {
    let heartRate = getHeartRate();
    let maxCorrelation = Math.random() * 2 - 1; // 仮のデータ（-1 〜 1 の乱数）

    if (heartRate !== null) {
        let currentTime = new Date().toLocaleTimeString(); // 現在の時刻

        // データ追加
        heartRateData.push(heartRate);
        maxCorrelationData.push(maxCorrelation);
        timeLabels.push(currentTime);

        // データ数が多くなりすぎたら古いデータを削除
        if (timeLabels.length > 50) {
            heartRateData.shift();
            maxCorrelationData.shift();
            timeLabels.shift();
        }

        // 相関を計算（十分なデータが溜まったら）
        if (heartRateData.length > 10) {
            let correlationValue = calculateCorrelation(heartRateData, maxCorrelationData);
            console.log(`Calculated Correlation: ${correlationValue}`);
            
        }

        // グラフ更新
        correlationChart.update();
    }
}, 1000);
