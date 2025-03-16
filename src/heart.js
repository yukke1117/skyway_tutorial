let ws = new WebSocket("ws://127.0.0.1:8000/ws");  // Connect to WebSocket Server

        let ctx = document.getElementById('correlationChart').getContext('2d');
        let correlationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],  // Time in seconds (hidden)
                datasets: [{
                    label: 'Synchronization Percentage',
                    data: [],
                    borderColor: 'red',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 3,  // Show small dots at data points
                    pointBackgroundColor: "black"  // Make points easier to see
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Time (s)", color: "black" } },
                    y: { 
                        title: { display: true, text: "Synchronization Percentage", color: "black" }, 
                        min: 0, 
                        max: 1 
                    }
                },
                plugins: {
                    legend: { display: true }
                }
            }
        });

        ws.onmessage = function(event) {
            let data;
            try {
                data = JSON.parse(event.data);
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                return;
            }

            if (!("max_correlation" in data)) {
                console.error("Error: Missing 'max_correlation' in received data.", data);
                return;
            }

            let maxCorrelation = data.max_correlation;
            let time = data.time;

            console.log(`Synchronization: ${(maxCorrelation * 100).toFixed(2)}%`);

            // Update the graph
            correlationChart.data.labels.push(time);
            correlationChart.data.datasets[0].data.push(maxCorrelation);
            correlationChart.update();

            // Trigger heart effect when synchronization is high
            if (maxCorrelation > 0.5) {
                document.body.style.backgroundColor = "pink";  // Soft pink when synchronized
                createHeartEffect();
            } else {
                document.body.style.backgroundColor = "white";
            }
            //この辺を修正する必要がある．
        };

        ws.onerror = function (error) {
            console.error("WebSocket Error:", error);
        };

        ws.onclose = function () {
            console.log("WebSocket Disconnected");
        };