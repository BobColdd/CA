// ---- Sidebar toggle ----
const rail = document.getElementById("rail");
const railToggle = document.getElementById("rail-toggle");

function setRailState(collapsed) {
  rail.classList.toggle("rail-collapsed", collapsed);
  localStorage.setItem("ca-rail-collapsed", collapsed ? "1" : "0");
}

// Restore previous state on load
if (localStorage.getItem("ca-rail-collapsed") === "1") {
  setRailState(true);
}

railToggle.addEventListener("click", () => {
  const isCollapsed = rail.classList.contains("rail-collapsed");
  setRailState(!isCollapsed);
});

// ---- Highlight active sidebar link based on ?tag= in URL ----
const params = new URLSearchParams(window.location.search);
const activeTag = params.get("tag") || "";

document.querySelectorAll(".rail-link").forEach((link) => {
  link.classList.toggle(
    "rail-link-active",
    link.dataset.tag === activeTag
  );
});

// ---- Search + tag filtering (homepage only) ----
const searchInput = document.getElementById("search-input");
const noteItems = document.querySelectorAll(".notes-list-item");
const noResultsEl = document.querySelector(".no-results");

function applyFilters() {
  const query = (searchInput.value || "").toLowerCase().trim();
  let visibleCount = 0;

  noteItems.forEach((item) => {
    const title = (item.dataset.title || "").toLowerCase();
    const tags = (item.dataset.tags || "").toLowerCase();

    const matchesSearch = !query || title.includes(query) || tags.includes(query);
    const matchesTag = !activeTag || tags.split(",").includes(activeTag.toLowerCase());

    const visible = matchesSearch && matchesTag;
    item.classList.toggle("is-hidden", !visible);
    if (visible) visibleCount++;
  });

  if (noResultsEl) {
    noResultsEl.classList.toggle("is-visible", visibleCount === 0);
  }
}

if (searchInput && noteItems.length) {
  searchInput.addEventListener("input", applyFilters);
  applyFilters(); // apply tag filter from URL on load
}
