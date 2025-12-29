window.BAGEL_SPEED = 0.2; // lower = slower

let A = 1;
let B = 1;

const renderAsciiFrame = preTag => {
	const width = 280;
	const height = 160;
	const b = Array(width * height).fill(' ');
	const z = Array(width * height).fill(0);

	A += 0.07 * window.BAGEL_SPEED;
	B += 0.03 * window.BAGEL_SPEED;

	const [cA, sA, cB, sB] = [Math.cos(A), Math.sin(A), Math.cos(B), Math.sin(B)];

	// Set newline characters at the end of each row
	for (let k = width - 1; k < width * height; k += width) {
		b[k] = '\n';
	}

	for (let j = 0; j < 2 * Math.PI; j += 0.07) {
		const ct = Math.cos(j);
		const st = Math.sin(j);

		for (let i = 0; i < 2 * Math.PI; i += 0.02) {
			const sp = Math.sin(i);
			const cp = Math.cos(i);
			const h = ct + 2;
			const D = 1 / (sp * h * sA + st * cA + 5);
			const t = sp * h * cA - st * sA;

			const x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
			const y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

			const o = x + width * y;
			const N = Math.floor(
				8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB),
			);

			if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
				z[o] = D;
				b[o] = '.,-bagelfund'[Math.max(0, N)];
				// b[o] = '`·╌░▏▎▍▌▋▊▉█'[Math.max(0, N)];
				// b[o] = '.,-~:;=!*#$@'[Math.max(0, N)];
			}
		}
	}

	preTag.innerHTML = b.join('');

	requestAnimationFrame(() => renderAsciiFrame(preTag));
};

let granteesData = [];
let filteredGranteesData = [];
let currentSort = {field: null, direction: 'asc'};
let searchQuery = '';
let selectedTags = [];

const VALID_TAGS = [
	'hardware',
	'software',
	'climate',
	'health tech',
	'deep tech',
	'robotics',
	'aerospace',
	'ai/ml',
	'biotech',
	'agriculture',
];

const formatDate = dateString => {
	if (!dateString) return '';
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
	} catch (e) {
		return dateString;
	}
};

const renderGrantees = grantees => {
	const tbody = document.querySelector('#grantees-tbody');
	tbody.innerHTML = '';

	grantees.forEach(grantee => {
		const tr = document.createElement('tr');

		// Name column (with optional link)
		const nameCell = document.createElement('td');
		if (grantee.link) {
			const link = document.createElement('a');
			link.href = grantee.link;
			link.target = '_blank';
			link.textContent = grantee.name;
			nameCell.appendChild(link);
		} else {
			nameCell.textContent = grantee.name;
		}
		tr.appendChild(nameCell);

		// Age column
		const ageCell = document.createElement('td');
		ageCell.textContent = grantee.age || '';
		tr.appendChild(ageCell);

		// Project Description column
		const projectCell = document.createElement('td');
		projectCell.textContent = grantee.projectDescription || '';
		tr.appendChild(projectCell);

		// Tags column
		const tagsCell = document.createElement('td');
		if (grantee.tags && Array.isArray(grantee.tags) && grantee.tags.length > 0) {
			const tagsContainer = document.createElement('div');
			tagsContainer.className = 'tags-container';
			grantee.tags.forEach(tag => {
				if (VALID_TAGS.includes(tag)) {
					const tagSpan = document.createElement('span');
					tagSpan.className = 'tag';
					tagSpan.textContent = tag;
					tagsContainer.appendChild(tagSpan);
				}
			});
			tagsCell.appendChild(tagsContainer);
		}
		tr.appendChild(tagsCell);

		// Funded Date column
		const dateCell = document.createElement('td');
		dateCell.textContent = formatDate(grantee.fundedDate);
		tr.appendChild(dateCell);

		tbody.appendChild(tr);
	});
};

const filterAndSearchGrantees = () => {
	let filtered = [...granteesData];

	// Apply search filter
	if (searchQuery.trim()) {
		const query = searchQuery.toLowerCase().trim();
		filtered = filtered.filter(grantee => {
			const nameMatch = grantee.name?.toLowerCase().includes(query);
			const descMatch = grantee.projectDescription?.toLowerCase().includes(query);
			return nameMatch || descMatch;
		});
	}

	// Apply tag filter
	if (selectedTags.length > 0) {
		filtered = filtered.filter(grantee => {
			if (!grantee.tags || !Array.isArray(grantee.tags)) return false;
			return selectedTags.some(tag => grantee.tags.includes(tag));
		});
	}

	filteredGranteesData = filtered;

	// Apply current sort if any
	if (currentSort.field) {
		sortGrantees(currentSort.field, false);
	} else {
		renderGrantees(filteredGranteesData);
	}
};

const sortGrantees = (field, updateSort = true) => {
	if (updateSort) {
		if (currentSort.field === field) {
			currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
		} else {
			currentSort.field = field;
			currentSort.direction = 'asc';
		}
	}

	const sorted = [...filteredGranteesData].sort((a, b) => {
		let aVal = a[field];
		let bVal = b[field];

		// Handle null/undefined values
		if (aVal == null && bVal == null) return 0;
		if (aVal == null) return 1;
		if (bVal == null) return -1;

		// Handle arrays (tags)
		if (Array.isArray(aVal)) {
			aVal = aVal.join(', ');
		}
		if (Array.isArray(bVal)) {
			bVal = bVal.join(', ');
		}

		// Handle dates
		if (field === 'fundedDate' && aVal && bVal) {
			aVal = new Date(aVal);
			bVal = new Date(bVal);
		}

		// Convert to strings for comparison
		aVal = String(aVal).toLowerCase();
		bVal = String(bVal).toLowerCase();

		const comparison = aVal.localeCompare(bVal);
		return currentSort.direction === 'asc' ? comparison : -comparison;
	});

	renderGrantees(sorted);
	if (updateSort) {
		updateSortIndicators();
	}
};

const updateSortIndicators = () => {
	document.querySelectorAll('.sort-indicator').forEach(indicator => {
		indicator.textContent = '↕';
	});

	if (currentSort.field) {
		const header = document.querySelector(`th[data-sort="${currentSort.field}"]`);
		if (header) {
			const indicator = header.querySelector('.sort-indicator');
			if (indicator) {
				indicator.textContent = currentSort.direction === 'asc' ? '↑' : '↓';
			}
		}
	}
};

const setupSearchAndFilter = () => {
	// Setup search input
	const searchInput = document.querySelector('#search-input');
	searchInput.addEventListener('input', e => {
		searchQuery = e.target.value;
		filterAndSearchGrantees();
	});

	// Setup tag filters
	const tagCheckboxes = document.querySelectorAll('.tag-checkbox');
	tagCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			selectedTags = Array.from(tagCheckboxes)
				.filter(cb => cb.checked)
				.map(cb => cb.value);
			filterAndSearchGrantees();
		});
	});
};

const loadGrantees = async () => {
	try {
		const response = await fetch('grantees.json');
		granteesData = await response.json();
		filteredGranteesData = [...granteesData];
		renderGrantees(granteesData);

		// Add click handlers to sortable headers
		document.querySelectorAll('.sortable').forEach(header => {
			header.style.cursor = 'pointer';
			header.addEventListener('click', () => {
				const sortField = header.getAttribute('data-sort');
				sortGrantees(sortField);
			});
		});

		// Setup search and filter
		setupSearchAndFilter();
	} catch (error) {
		console.error('Error loading grantees:', error);
	}
};

document.addEventListener('DOMContentLoaded', () => {
	const preTag = document.querySelector('#bagel');
	renderAsciiFrame(preTag);
	loadGrantees();
});
