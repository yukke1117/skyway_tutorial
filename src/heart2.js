function getHeartRate() {
    let heartRateText = document.getElementById("heart-rate1").innerText; // 例: "95 bpm"
    let heartRate = parseInt(heartRateText.replace(" bpm", ""), 10); // "95 bpm" → 95 に変換
    return isNaN(heartRate) ? null : heartRate;
}

function getHeartRate2() {
    let heartRateText = document.getElementById("heart-rate2").innerText; // 例: "88 bpm"
    let heartRate = parseInt(heartRateText.replace(" bpm", ""), 10); // "88 bpm" → 88 に変換
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
let heartRate2Data = [];
let timeLabels = [];
let maxCorrelationData = [];

// グラフのセットアップ
let ctx = document.getElementById('correlationChart').getContext('2d');
let correlationChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
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
            y: { title: { display: true, text: "Value", color: "black" }, min: 0, max: 1 }
        },
        plugins: {
            legend: { display: true }
        }
    }
});

// 1秒ごとにデータを更新
setInterval(() => {
    let heartRate = getHeartRate();
    let heartRate2 = getHeartRate2();

    if (heartRate !== null && heartRate2 !== null) {
        let currentTime = new Date().toLocaleTimeString(); // 現在の時刻

        // データ追加
        heartRateData.push(heartRate);
        heartRate2Data.push(heartRate2);
        timeLabels.push(currentTime);

        // データ数が多くなりすぎたら古いデータを削除
        if (timeLabels.length > 10) {
            heartRateData.shift();
            heartRate2Data.shift();
            timeLabels.shift();
            maxCorrelationData.shift();
        }

        // 相関を計算（十分なデータが溜まったら）
        if (heartRateData.length > 5) {
            let correlationValue = calculateCorrelation(heartRateData, heartRate2Data);
            let correlationValue_new = (correlationValue + 1) / 2;
            console.log(`Heart Rate 1 & 2 Correlation: ${correlationValue_new}`);
            maxCorrelationData.push(correlationValue_new);
            correlationChart.data.labels = timeLabels; // ラベル更新
            correlationChart.data.datasets[0].data = maxCorrelationData; // データセット更新
            correlationChart.update();
            if (correlationValue_new >= 0.4) {
                createHeartEffect();
            }

        }
    }
}, 1000);
