// @ts-check

class PageScroller {
  /** @type { IntersectionObserver } */
  textObserver;
  
  /** @type { IntersectionObserver} */
  imgObserver;

  constructor() {
    this.initTextObserver();
    this.initImgObserver();
  }

  initTextObserver() {
    this.textObserver = new IntersectionObserver(
      entries => this.textObserverListener(entries),
      { threshold: 0.1 }
    );

    const $textList = document.querySelectorAll(".section01-text");
    $textList.forEach($text => this.textObserver.observe($text));
  }

  /** @param { IntersectionObserverEntry[] } entries */
  textObserverListener(entries) {
    entries.forEach(entry => {
      const {
        intersectionRatio,
        target,
      } = entry;

      intersectionRatio > 0.1
        ? target.classList.add("text_visible")
        : target.classList.remove("text_visible");
    });
  }

  initImgObserver() {
    this.imgObserver = new IntersectionObserver(
      entries => this.imgObserverListener(entries),
      { threshold: 0.5 }
    );

    const $imgList = document.querySelectorAll(".section02-imgWrapper-img");
    $imgList.forEach($img => this.imgObserver.observe($img));
  }

  /** @param { IntersectionObserverEntry[] } entries */
  imgObserverListener(entries) {
    entries.forEach(entry => {
      const {
        intersectionRatio,
        target,
      } = entry;

      intersectionRatio > 0.5
        ? target.classList.add("img_visible")
        : target.classList.remove("img_visible");
    });
  }

  destroy() {
    this.textObserver.disconnect();
    this.imgObserver.disconnect();
  }
}

/** @type { PageScroller } */
let pageScroller;

window.addEventListener(
  "DOMContentLoaded",
  () => (pageScroller = new PageScroller())
);

window.addEventListener(
  "beforeunload",
  () => pageScroller?.destroy()
);