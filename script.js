let arrangements = [];
let state = { search: "", category: "all", difficulty: "all" };

const grid = document.getElementById("library-grid");
const empty = document.getElementById("empty-state");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const difficultyFilter = document.getElementById("difficulty-filter");

const modal = document.getElementById("pdf-modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const pdfFrame = document.getElementById("pdf-frame");

function uniqueValues(key) {
  return [...new Set(arrangements.map(x => x[key]).filter(Boolean))].sort();
}

function populateFilters() {
  uniqueValues("category").forEach(value => {
    const opt = document.createElement("option");
    opt.value = value; opt.textContent = value;
    categoryFilter.appendChild(opt);
  });
  uniqueValues("difficulty").forEach(value => {
    const opt = document.createElement("option");
    opt.value = value; opt.textContent = value;
    difficultyFilter.appendChild(opt);
  });
}

function matches(item) {
  const haystack = [
    item.title, item.subtitle, item.category, item.difficulty,
    item.instrument, item.composer, ...(item.tags || [])
  ].join(" ").toLowerCase();

  return haystack.includes(state.search.toLowerCase())
    && (state.category === "all" || item.category === state.category)
    && (state.difficulty === "all" || item.difficulty === state.difficulty);
}

function card(item) {
  const article = document.createElement("article");
  article.className = "music-card";
  const tags = [item.category, item.difficulty, ...(item.tags || []).slice(0, 2)]
    .filter(Boolean)
    .map(t => `<span class="tag">${t}</span>`).join("");

  article.innerHTML = `
    <div class="card-top">
      <div class="tag-row">${tags}</div>
      <div class="card-icon">♫</div>
    </div>
    <div class="card-body">
      <h3>${item.title}</h3>
      <p class="subtitle">${item.subtitle || ""}</p>
      <div class="meta">
        ${item.instrument ? `<span>🎺 ${item.instrument}</span>` : ""}
        ${item.composer ? `<span>✍️ ${item.composer}</span>` : ""}
      </div>
      <div class="card-actions">
        <button class="preview">Preview</button>
        <a class="download" href="${item.pdf}" download>PDF ↓</a>
      </div>
    </div>`;

  article.querySelector(".preview").addEventListener("click", () => openPreview(item));
  return article;
}

function render() {
  const filtered = arrangements.filter(matches);
  grid.innerHTML = "";
  filtered.forEach(item => grid.appendChild(card(item)));
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`;
  empty.hidden = filtered.length !== 0;
}

function openPreview(item) {
  modalTitle.textContent = item.title;
  modalMeta.textContent = [item.instrument, item.difficulty].filter(Boolean).join(" • ");
  pdfFrame.src = item.pdf;
  modal.showModal();
}

modalClose.addEventListener("click", () => {
  modal.close();
  pdfFrame.src = "";
});
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.close();
    pdfFrame.src = "";
  }
});

searchInput.addEventListener("input", e => { state.search = e.target.value; render(); });
categoryFilter.addEventListener("change", e => { state.category = e.target.value; render(); });
difficultyFilter.addEventListener("change", e => { state.difficulty = e.target.value; render(); });

fetch("arrangements.json")
  .then(r => r.json())
  .then(data => {
    arrangements = data;
    populateFilters();
    render();

    document.getElementById("stat-total").textContent = arrangements.length;
    document.getElementById("stat-categories").textContent = uniqueValues("category").length;
    document.getElementById("stat-free").textContent = arrangements.filter(x => x.free !== false).length;
  })
  .catch(err => {
    console.error(err);
    resultCount.textContent = "Could not load arrangements.json";
  });

document.getElementById("year").textContent = new Date().getFullYear();
