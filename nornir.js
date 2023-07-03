/*ハンバーガーメニューを押したときの動き*/
function toggleMenu() {
  const menu = document.getElementById("menu");
  const ham = document.querySelector("#js-hamburger");

  if (ham.classList.contains("active")) {
    menu.style.left = "-400px";
    ham.classList.remove("active");
  } else {
    menu.style.left = "0";
    ham.classList.add("active");
  }
}

/*メインビジュアルのロゴを一文字ずつ表示させる動き*/
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".main-visual__letter");
  const text = textElement.textContent;

  // 元のテキストをクリア
  textElement.textContent = "";

  // 文字を一文字ずつ処理
  Array.from(text).forEach((character, index) => {
    const span = createAnimatedSpan(character, index * 0.1);
    textElement.appendChild(span);
  });
});

/**
 * 文字を含むspan要素を作成し、アニメーションを適用。
 *
 * @param {string} character - span要素に挿入する文字
 * @param {number} delay - アニメーションの遅延時間（秒）
 * @return {HTMLElement} アニメーションが適用されたspan要素
 */
function createAnimatedSpan(character, delay) {
  const span = document.createElement("span");
  span.textContent = character;
  span.style.display = "inline-block";
  span.style.opacity = "0";
  span.style.animation = "revealText 2s forwards";
  span.style.animationDelay = `${delay}s`;

  return span;
}

/*h2,h3要素のアニメーション。下から出現させる*/
document.addEventListener("DOMContentLoaded", () => {
  // 変数の定義
  const subtitleElements = document.querySelectorAll(".subtitle");
  const titleDescriptionElements =
    document.querySelectorAll(".title-description");

  // IntersectionObserverのコールバック関数
  const fadeInElements = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 要素が表示されたらフェードインアニメーションを適用
        entry.target.classList.add("fadeInUp");

        // h3要素のアニメーションはh2要素の直後に開始
        if (entry.target.classList.contains("subtitle")) {
          const description = entry.target.nextElementSibling;
          if (
            description &&
            description.classList.contains("title-description")
          ) {
            setTimeout(() => {
              description.classList.add("fadeInUp");
            }, 500);
          }
        }

        // 監視を解除
        observer.unobserve(entry.target);
      }
    });
  };

  // IntersectionObserverを初期化して要素の監視を開始
  const observer = new IntersectionObserver(fadeInElements);
  subtitleElements.forEach((element) => observer.observe(element));
});

/*Aboutまでスクロールした時、ナビゲーションアイコンの色と背景色を変える*/
document.addEventListener("scroll", () => {
  // スクロールイベントを監視
  const aboutSection = document.querySelector(".about"); // 'about'セクションを選択
  const navLinks = document.querySelectorAll(".navi__link"); // 全てのナビゲーションリンクを選択
  const backgroudColor = document.querySelector(".header__top"); // naviクラスを持つ要素を選択
  const isScrolledToAbout = aboutSection.getBoundingClientRect().top <= 0; // 'about'がビューポート上部にあるかチェック

  navLinks.forEach((link) => {
    // ナビゲーションリンクをループ
    if (isScrolledToAbout) {
      link.classList.add("change-color"); // 'about'にスクロールした場合、'change-color'クラスを追加
      backgroudColor.classList.add("change-background"); // 'about'にスクロールした場合、'change-background'クラスを追加
    } else {
      link.classList.remove("change-color"); // そうでなければ'change-color'クラスを削除
      backgroudColor.classList.remove("change-background"); // 'change-background'クラスを削除
    }
  });
});

$(".slider").slick({
  autoplay: true, //自動的に動き出すか。初期値はfalse。
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  speed: 500, //スライドのスピード。初期値は300。
  slidesToShow: 3, //スライドを画面に3枚見せる
  slidesToScroll: 1, //1回のスクロールで1枚の写真を移動して見せる
  prevArrow: '<div class="slick-prev"></div>', //矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>', //矢印部分NextのHTMLを変更
  centerMode: true, //要素を中央ぞろえにする
  variableWidth: true, //幅の違う画像の高さを揃えて表示
  dots: true, //下部ドットナビゲーションの表示
});
