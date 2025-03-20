document.addEventListener("DOMContentLoaded", function () {
    const graphzoom = document.getElementById("correlationChart");

    function createHeartEffect() {
        let back = document.createElement("div");
        back.classList.add("back");

        let heart = document.createElement("div");
        heart.classList.add("heart");

        let img = document.createElement("img");
        img.src = new URL("/heart.869a033f.png", document.baseURI).href;
        img.alt = 'ハートの画像';

        heart.appendChild(img);
        back.appendChild(heart);
        document.body.appendChild(back);

        // ハートクリック時のグラフ表示
        heart.addEventListener("click", function () {
            zoomback.style.display = "flex";
            graphzoom.style.display = "block";  // canvas を表示
            graphzoom.classList.add("deka");
        });

        setTimeout(() => {
            console.log("要素を削除します");
            heart.remove();
        }, 5000); // 5秒後に削除
    }

    // 🔥 グローバルスコープに登録（追加）
    window.createHeartEffect = createHeartEffect;

    zoomback.addEventListener("click", modosu);

    // 拡大領域を閉じるイベント
    function modosu() {
        zoomback.style.display = "none";
        graphzoom.style.display = "none";  // canvas を非表示
        graphzoom.classList.remove("deka");
    }
});
