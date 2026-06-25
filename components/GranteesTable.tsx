'use client';

import {useState, useMemo, useRef, useEffect} from 'react';
import type {Grantee, SortField, SortDirection} from '@/types';

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

interface GranteesTableProps {
	grantees: Grantee[];
}

export default function GranteesTable({grantees}: GranteesTableProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filterMenuOpen, setFilterMenuOpen] = useState(false);
	const [sortState, setSortState] = useState<{
		field: SortField;
		direction: SortDirection;
	}>({field: 'fundedDate', direction: 'desc'});
	const filterRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!filterMenuOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
				setFilterMenuOpen(false);
			}
		};
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setFilterMenuOpen(false);
		};
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEsc);
		};
	}, [filterMenuOpen]);

	const filteredAndSortedGrantees = useMemo(() => {
		let filtered = [...grantees];

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

		// Apply sorting
		if (sortState.field) {
			filtered = [...filtered].sort((a, b) => {
				let aVal: any = a[sortState.field as keyof Grantee];
				let bVal: any = b[sortState.field as keyof Grantee];

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

				// Handle dates numerically
				if (sortState.field === 'fundedDate') {
					const aTime = new Date(aVal as string).getTime();
					const bTime = new Date(bVal as string).getTime();
					const comparison = aTime - bTime;
					return sortState.direction === 'asc' ? comparison : -comparison;
				}

				// Handle ages numerically
				if (sortState.field === 'age') {
					const comparison = Number(aVal) - Number(bVal);
					return sortState.direction === 'asc' ? comparison : -comparison;
				}

				// Convert to strings for comparison
				aVal = String(aVal).toLowerCase();
				bVal = String(bVal).toLowerCase();

				const comparison = aVal.localeCompare(bVal);
				return sortState.direction === 'asc' ? comparison : -comparison;
			});
		}

		return filtered;
	}, [grantees, searchQuery, selectedTags, sortState]);

	const handleSort = (field: SortField) => {
		setSortState((prev: {field: SortField; direction: SortDirection}) => {
			if (prev.field === field) {
				return {
					field,
					direction: prev.direction === 'asc' ? 'desc' : 'asc',
				};
			}
			return {field, direction: 'asc'};
		});
	};

	const handleTagToggle = (tag: string) => {
		setSelectedTags((prev: string[]) =>
			prev.includes(tag) ? prev.filter((t: string) => t !== tag) : [...prev, tag],
		);
	};

	const getSortIndicator = (field: SortField) => {
		if (sortState.field !== field) return '↕';
		return sortState.direction === 'asc' ? '↑' : '↓';
	};

	return (
		<div>
			<h2>Grantees & Projects</h2>

			<div className="searchFilterContainer">
				<input
					type="text"
					className="searchInput"
					placeholder="Search by name or project description..."
					value={searchQuery}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
				/>
				<div className="filterWrapper" ref={filterRef}>
					<button
						type="button"
						className={`filterButton${selectedTags.length > 0 ? ' active' : ''}`}
						onClick={() => setFilterMenuOpen((prev: boolean) => !prev)}
						aria-expanded={filterMenuOpen}
						aria-haspopup="menu"
					>
						<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
							<path d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 .78 1.625L14 14.33V20a1 1 0 0 1-1.447.894l-3-1.5A1 1 0 0 1 9 18.5V14.33L3.22 5.625A1 1 0 0 1 3 5z" />
						</svg>
						<span>Filter</span>
						{selectedTags.length > 0 && (
							<span className="filterBadge">{selectedTags.length}</span>
						)}
					</button>
					{filterMenuOpen && (
						<div className="filterMenu" role="menu">
							{VALID_TAGS.map((tag: string) => (
								<label key={tag} className="filterMenuItem">
									<input
										type="checkbox"
										checked={selectedTags.includes(tag)}
										onChange={() => handleTagToggle(tag)}
									/>
									<span>{tag}</span>
								</label>
							))}
							{selectedTags.length > 0 && (
								<button
									type="button"
									className="filterClear"
									onClick={() => setSelectedTags([])}
								>
									Clear filters
								</button>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="granteesContainer">
				<table className="granteesTable">
					<thead>
						<tr>
							<th>Name</th>
							<th className="sortable" onClick={() => handleSort('age')}>
								Age <span className="sortIndicator">{getSortIndicator('age')}</span>
							</th>
							<th>Project</th>
							<th className="sortable" onClick={() => handleSort('tags')}>
								Tags <span className="sortIndicator">{getSortIndicator('tags')}</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredAndSortedGrantees.length === 0 ? (
							<tr>
								<td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>
									No grantees found.
								</td>
							</tr>
						) : (
							filteredAndSortedGrantees.map((grantee: Grantee, index: number) => (
								<tr key={`${grantee.name}-${index}`}>
									<td>{grantee.name}</td>
									<td>{grantee.age || ''}</td>
									<td>{grantee.projectDescription || ''}</td>
									<td>
										{grantee.tags && Array.isArray(grantee.tags) && grantee.tags.length > 0 && (
											<div className="tagsContainer">
												{grantee.tags
													.filter((tag: string) => VALID_TAGS.includes(tag))
													.map((tag: string) => (
														<span key={tag} className="tag">
															{tag}
														</span>
													))}
											</div>
										)}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
