'use client';

import {useState, useMemo} from 'react';
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
	const [sortState, setSortState] = useState<{
		field: SortField;
		direction: SortDirection;
	}>({field: null, direction: 'asc'});

	const formatDate = (dateString: string): string => {
		if (!dateString) return '';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			});
		} catch (e) {
			return dateString;
		}
	};

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

				// Handle dates
				if (sortState.field === 'fundedDate' && aVal && bVal) {
					aVal = new Date(aVal as string);
					bVal = new Date(bVal as string);
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
				<div className="searchContainer">
					<input
						type="text"
						className="searchInput"
						placeholder="Search by name or project description..."
						value={searchQuery}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="filterContainer">
					<span className="filterLabel">Filter by tags:</span>
					<div className="tagFilters">
						{VALID_TAGS.map((tag: string) => (
							<label key={tag} className="tagFilterLabel">
								<input
									type="checkbox"
									className="tagCheckbox"
									value={tag}
									checked={selectedTags.includes(tag)}
									onChange={() => handleTagToggle(tag)}
								/>
								<span>{tag}</span>
							</label>
						))}
					</div>
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
							<th className="sortable" onClick={() => handleSort('fundedDate')}>
								Grant Date <span className="sortIndicator">{getSortIndicator('fundedDate')}</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredAndSortedGrantees.length === 0 ? (
							<tr>
								<td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>
									No grantees found.
								</td>
							</tr>
						) : (
							filteredAndSortedGrantees.map((grantee: Grantee, index: number) => (
								<tr key={`${grantee.name}-${index}`}>
									<td>
										{grantee.link ? (
											<a href={grantee.link} target="_blank" rel="noopener noreferrer">
												{grantee.name}
											</a>
										) : (
											grantee.name
										)}
									</td>
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
									<td>{formatDate(grantee.fundedDate)}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
