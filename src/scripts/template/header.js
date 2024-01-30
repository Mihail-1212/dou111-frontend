function handlePosStickyMove() {
    const el = document.querySelector(".body-header")
    const observer = new IntersectionObserver(
        ([e]) => {
            console.log(e)
            e.target.classList.toggle("shadow-bottom", !e.isIntersecting)
        },
        { threshold: [1] }
    );
    observer.observe(el);
}



document.addEventListener('DOMContentLoaded', function() {
    handlePosStickyMove();
});
