import type { Directive } from "vue";

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
);

export const reveal: Directive = {
  mounted(el: HTMLElement, binding) {
    el.classList.add("reveal");
    if (typeof binding.value === "number") {
      el.style.transitionDelay = `${binding.value}ms`;
    }
    observer.observe(el);
  },
};
