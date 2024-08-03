document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    // Apply initial background image
    document.body.style.backgroundImage = `url('${sections[0].dataset.bg}')`;

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const offset = section.offsetTop;
            if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + section.offsetHeight) {
                document.body.style.backgroundImage = `url('${section.dataset.bg}')`;
            }
        });
    });
});
