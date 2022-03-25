// @ts-check

class ScrollAnimator {
  /** @type { IntersectionObserver } */
  _observer;

  /** @type { HTMLElement[] } */
  _targetElements;

  /**
   * @param {{
   *  selectors: string[];
   * }} options
   */
  constructor({ selectors }) {
    this._initTargetElements(selectors);
    
    this._initObserver();
    this._subscribe();
  }

  /** @param { string[] } selectors */
  _initTargetElements(selectors) {
    this._targetElements = selectors
      .map(selector => {
        /** @type { any } */
        const elements = document.querySelectorAll(selector);

        /** @type { HTMLElement[] } */
        const elementArr = elements
        return elementArr;
      })
      .reduce((result, elements) => {
        result.push(...elements);
        return result;
      }, []);
  }

  _initObserver() {
    this._observer = new IntersectionObserver(
      entries => this._handler(entries)
    )
  }

  /** @param { IntersectionObserverEntry[] } entries */
  _handler(entries) {
    entries.forEach(entry => {
      const {
        intersectionRatio,
        target
      } = entry;

      intersectionRatio > 0
        ? this._applyActive(target)
        : this._applyInactive(target);
    });
  }

  /** @param { Element } element */
  _applyActive(element) {
    switch (element.tagName) {
      case "P": {
        element.classList.add("text_active");
        break;
      }

      case "IMG": {
        element.classList.add("img_active");
        break;
      }
    }
  }

  /** @param { Element } target */
  _applyInactive(target) {
    switch (target.tagName) {
      case "P": {
        target.classList.remove("text_active");
        break;
      }

      case "IMG": {
        target.classList.remove("img_active");
        break;
      }
    }
  }

  _subscribe() {
    this._targetElements.forEach(element => {
      this._observer.observe(element);
    });
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ScrollAnimator({
    selectors: [
      '.intersectionObserver-section-article-text',
      '.intersectionObserver-section-article-img',
    ],
  })
);