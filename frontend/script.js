document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const offset = section.offsetTop;
            if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + section.offsetHeight) {
                document.body.style.backgroundImage = `url('background${index + 1}.webp')`;
            }
        });
    });
});
