document.addEventListener("DOMContentLoaded", function() {
    const zoomback = document.getElementById("zoomback");
    const zoomimg = document.getElementById("zoomimg");
    function createHeartEffect(imagePath) {
        let back = document.createElement("div");
        back.classList.add("back");
        let heart = document.createElement("div");
        heart.classList.add("heart");
        let img = document.createElement("img");
        img.src = new URL("/heart.869a033f.png", document.baseURI).href;
        img.alt = "\u30CF\u30FC\u30C8\u306E\u753B\u50CF";
        console.log("\u753B\u50CF\u306E\u30D1\u30B9:", img.src);
        heart.appendChild(img);
        back.appendChild(heart);
        document.body.appendChild(back);
        console.log("\u8FFD\u52A0\u3055\u308C\u305F\u8981\u7D20:", back);
        // ハートクリック時の拡大表示
        heart.addEventListener("click", function() {
            zoomback.style.display = "flex";
            zoomimg.setAttribute("src", imagePath);
            zoomimg.classList.add("deka");
        });
        setTimeout(()=>{
            console.log("\u8981\u7D20\u3092\u524A\u9664\u3057\u307E\u3059");
            back.remove();
        }, 5000); // 5秒後に削除
    }
    // 初回実行
    createHeartEffect("./img/zoom.jpeg");
    // 拡大領域を閉じるイベント
    zoomback.addEventListener("click", function() {
        zoomback.style.display = "none";
        zoomimg.classList.remove("deka");
    });
});

//# sourceMappingURL=index.ff058895.js.map
