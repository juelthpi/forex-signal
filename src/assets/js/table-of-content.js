document.addEventListener("DOMContentLoaded", () => {
    const contentArea = document.querySelector(".right-content");
    const tocContainer = document.getElementById("table-of-contents");
    const h2Headings = contentArea.querySelectorAll("h2");

    if (h2Headings.length === 0) {
        tocContainer.innerHTML =
            "<p>No headings available for Table of Contents.</p>";
        return;
    }

    const tocList = document.createElement("ul");

    h2Headings.forEach((heading) => {
        const id =
            heading.getAttribute("id") ||
            "section-" + Math.random().toString(36).substr(2, 9);
        heading.setAttribute("id", id);

        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = "#" + id;

        //  LIMIT TO MAX 8 WORDS
        let originalText = heading.textContent.trim();
        let words = originalText.split(" ");
        if (words.length > 4) {
            link.textContent = words.slice(0, 4).join(" ") + "...";
        } else {
            link.textContent = originalText;
        }

        link.classList.add("toc-link");

        link.addEventListener("click", function () {
            document
                .querySelectorAll(".toc-link")
                .forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
        });

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    tocContainer.appendChild(tocList);
    const tocLinks = document.querySelectorAll(".toc-link");
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
        let activeFound = false;
        for (let i = entries.length - 1; i >= 0; i--) {
            const entry = entries[i];
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                if (!document.querySelector(".toc-link.active")) {
                    tocLinks.forEach((link) => link.classList.remove("active"));
                    const activeLink = document.querySelector(
                        `.toc-link[href="#${currentId}"]`
                    );
                    if (activeLink) activeLink.classList.add("active");
                }
                activeFound = true;
                break;
            }
        }
        if (!activeFound && tocLinks.length > 0) {
            tocLinks.forEach((link) => link.classList.remove("active"));
            if (window.scrollY < h2Headings[0].offsetTop) {
                tocLinks[0].classList.add("active");
            }
        }
    }, observerOptions);
    h2Headings.forEach((heading) => observer.observe(heading));
});