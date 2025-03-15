const zoom = document.querySelectorAll("#zoom");
const zoomback = document.getElementById("zoomback");
const zoomimg = document.getElementById("zoomimg");

// 一括でイベントリスナ　..②
zoom.forEach(function(value) {
      value.addEventListener("click",kakudai);
      });


function kakudai(e) {

    zoomback.style.display = "flex";
    zoomimg.setAttribute("src",e.target.src);
    // 「deka」クラスを付与　..⑦
    zoomimg.classList.add("deka");
}


// 元に戻すイベントリスナを指定　..⑤
zoomback.addEventListener("click",modosu);

// 拡大領域を無きものに　..⑥
function modosu() {

    zoomback.style.display = "none";
    // 「deka」クラスを削除　..⑧
    zoomimg.classList.remove("deka")
    }