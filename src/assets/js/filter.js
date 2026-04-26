document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    const btn = e.target;
    const container = btn.closest(".filter-container");
    const filterButtons = container.querySelectorAll(".filter-btn");
    const filterItems = container.querySelectorAll(".filter-item");

    // active button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    filterItems.forEach((item) => {
        const categories = item.dataset.category.split(" ");
        if (filter === "all" || categories.includes(filter)) {
            item.classList.remove("filter-hide");
            item.classList.add("filter-show");
        } else {
            item.classList.add("filter-hide");
            item.classList.remove("filter-show");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const initializeFilter = (instance) => {
        const buttons = instance.querySelectorAll(".filter-btn");
        const items = instance.querySelectorAll(".filter-item");
        const searchInput = instance.querySelector(".filter-search-input");
        const grid = instance.querySelector(".filter-grid");
        const noResults = instance.querySelector(".no-results");

        let currentFilter = "all";
        let searchTerm = "";

        // Function to update counts on buttons
        const updateButtonCounts = () => {
            buttons.forEach((btn) => {
                const filterValue = btn.getAttribute("data-filter");
                let count = 0;

                if (filterValue === "all") {
                    count = items.length;
                } else {
                    count = Array.from(items).filter(item => {
                        const itemCats = (item.getAttribute("data-category") || "").split(" ");
                        return itemCats.includes(filterValue);
                    }).length;
                }
                const baseText = btn.textContent.split("(")[0].trim();
                btn.innerHTML = `${baseText} <span class="ml-1 text-xs opacity-60">(${count})</span>`;
            });
        };
        const applyFilters = () => {
            let visibleCount = 0;
            items.forEach((item) => {
                const categoryAttr = item.getAttribute("data-category") || "";
                const categories = categoryAttr.split(" ");
                const titleElement = item.querySelector(".filter-item-title");
                const title = titleElement ? titleElement.textContent.toLowerCase() : "";

                const matchesCategory = currentFilter === "all" || categories.includes(currentFilter);
                const matchesSearch = title.includes(searchTerm);

                if (matchesCategory && matchesSearch) {
                    item.classList.remove("hidden");
                    item.classList.add("filter-show");
                    item.style.animationDelay = `${visibleCount * 0.1}s`;
                    visibleCount++;
                } else {
                    item.classList.add("hidden");
                    item.classList.remove("filter-show");
                    item.style.animationDelay = "0s";
                }
            });
            if (visibleCount === 0) {
                if (grid) grid.classList.add("hidden");
                if (noResults) noResults.classList.remove("hidden");
            } else {
                if (grid) grid.classList.remove("hidden");
                if (noResults) noResults.classList.add("hidden");
            }
        };
        updateButtonCounts();
        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                buttons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.getAttribute("data-filter");
                applyFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                searchTerm = e.target.value.toLowerCase().trim();
                applyFilters();
            });
        }
    };
    document.querySelectorAll("[data-filter-group]").forEach(initializeFilter);
});