// Fields for pagination
export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

// Searchable STRING fields (regex allowed only here)
export const productSearchableFields = ['slug', 'name', 'description'];

// Filterable fields from query
export const productFilterableFields = [
  'searchTerm',
  'id',
  'category',
  'minPrice',
  'maxPrice',
];
