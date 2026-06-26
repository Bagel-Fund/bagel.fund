// client-side search / tag-filter / sort for the server-rendered grantees table.
// reads everything off the data-* attributes the .astro component renders, so the
// table still works without js, this just enhances it.

type SortField = "age" | "tags" | "fundedDate";
type SortDirection = "asc" | "desc";

// each comparator returns a < b ordering for ascending; direction flips it later
const COMPARATORS = {
  age: (a, b) => Number(a.dataset.age) - Number(b.dataset.age),
  fundedDate: (a, b) => Number(a.dataset.date) - Number(b.dataset.date),
  tags: (a, b) => (a.dataset.tags ?? "").localeCompare(b.dataset.tags ?? ""),
} as const satisfies Record<
  SortField,
  (a: HTMLElement, b: HTMLElement) => number
>;

const tbody =
  document.querySelector<HTMLTableSectionElement>("#grantees-tbody");
const searchInput = document.querySelector<HTMLInputElement>("#search-input");
const noResults = document.querySelector<HTMLTableRowElement>("#no-results");
const rows = Array.from(
  document.querySelectorAll<HTMLTableRowElement>(".grantee-row"),
);
const checkboxes = Array.from(
  document.querySelectorAll<HTMLInputElement>(".tag-checkbox"),
);

let searchQuery = "";
let selectedTags: string[] = [];
let sortField: SortField | null = null;
let sortDirection: SortDirection = "asc";

const render = () => {
  if (!tbody || !noResults) {
    return;
  }

  const query = searchQuery.toLowerCase().trim();
  const visible = rows.filter((row) => {
    const matchesSearch =
      !query ||
      (row.dataset.name ?? "").includes(query) ||
      (row.dataset.desc ?? "").includes(query);
    const rowTags = (row.dataset.tags ?? "").split(",");
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => rowTags.includes(tag));

    return matchesSearch && matchesTags;
  });

  if (sortField) {
    const compare = COMPARATORS[sortField];
    visible.sort((a, b) =>
      sortDirection === "asc" ? compare(a, b) : -compare(a, b),
    );
  }

  rows.forEach((row) => row.classList.add("hidden"));
  visible.forEach((row) => {
    row.classList.remove("hidden");
    tbody.appendChild(row);
  });

  noResults.classList.toggle("hidden", visible.length > 0);
};

const updateSortIndicators = () => {
  document.querySelectorAll(".sort-indicator").forEach((indicator) => {
    indicator.textContent = "↕";
  });

  if (sortField) {
    const header = document.querySelector(
      `th[data-sort="${sortField}"] .sort-indicator`,
    );

    if (header) {
      header.textContent = sortDirection === "asc" ? "↑" : "↓";
    }
  }
};

searchInput?.addEventListener("input", (event) => {
  searchQuery = (event.target as HTMLInputElement).value;
  render();
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    selectedTags = checkboxes.filter((cb) => cb.checked).map((cb) => cb.value);
    render();
  });
});

document.querySelectorAll<HTMLElement>(".sortable").forEach((header) => {
  header.addEventListener("click", () => {
    const field = header.dataset.sort as SortField;

    if (sortField === field) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortField = field;
      sortDirection = "asc";
    }

    updateSortIndicators();
    render();
  });
});
