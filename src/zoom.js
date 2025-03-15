document.addEventListener("DOMContentLoaded", function () {
    const zoomback = document.getElementById("zoomback");
    const zoomimg = document.getElementById("zoomimg");

    function createHeartEffect(imagePath) {
        let back = document.createElement("div");
        back.classList.add("back");

        let heart = document.createElement("div");
        heart.classList.add("heart");

        let img = document.createElement("img");
        img.src = new URL("/heart.869a033f.png", document.baseURI).href;
        img.alt = 'ハートの画像';
        console.log("画像のパス:", img.src);



        heart.appendChild(img);
        back.appendChild(heart);
        document.body.appendChild(back);

        console.log("追加された要素:", back);

        // ハートクリック時の拡大表示
        heart.addEventListener("click", function () {
            zoomback.style.display = "flex";
            zoomimg.setAttribute("src", imagePath);
            zoomimg.classList.add("deka");
        });

        setTimeout(() => {
            console.log("要素を削除します");
            back.remove();
        }, 5000); // 5秒後に削除
    }

    // 初回実行
    createHeartEffect("./img/zoom.jpeg");

    // 拡大領域を閉じるイベント
    zoomback.addEventListener("click", function () {
        zoomback.style.display = "none";
        zoomimg.classList.remove("deka");
    });
});