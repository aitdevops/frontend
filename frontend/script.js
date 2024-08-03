document.addEventListener('DOMContentLoaded', function() {
    // Apply initial background image
    const sections = document.querySelectorAll('section');
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
