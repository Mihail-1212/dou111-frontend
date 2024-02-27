function handlePosStickyMove() {
    const headerEl = document.querySelector(".body-header"),
        subheaderEl = document.querySelector("#sub-header");

    const observer = new IntersectionObserver(([e]) => {
        headerEl.classList.toggle("shadow-bottom", !e.isIntersecting);
    });

    observer.observe(subheaderEl);
}


document.addEventListener('DOMContentLoaded', function () {
    handlePosStickyMove();
});
