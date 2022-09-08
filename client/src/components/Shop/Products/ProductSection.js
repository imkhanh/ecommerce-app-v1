import React from 'react';
import ProductFilters from './ProductFilters';

const ProductSection = () => {
	return (
		<section className="py-12 md:py-8">
			<div className="grid grid-cols-4 items-start lg:grid-cols-1 gap-4">
				<ProductFilters />
				<div className="h-[2000px] col-span-3">
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							<span className="sm:hidden inline">Showing</span> 6 of 24 Products
						</p>

						<div className="ml-4">
							<label for="SortBy" className="sr-only">
								Sort
							</label>

							<select id="SortBy" name="sort_by" className="text-sm border-gray-100 rounded">
								<option readonly>Sort</option>
								<option value="title-asc">Title, A-Z</option>
								<option value="title-desc">Title, Z-A</option>
								<option value="price-asc">Price, Low-High</option>
								<option value="price-desc">Price, High-Low</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductSection;
