import "@/scss/_animations.scss";

export default () => {
  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }

  let options = {
    threshold: [0.3]
  };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation-right, .element-animation-left");

  for (let elm of elements) {
    observer.observe(elm);
    elm.parentElement.style.position = "relative";
  }
};