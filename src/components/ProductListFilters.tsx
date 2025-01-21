"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const ProductListFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract existing filters from URL
  const initialFilters = {
    searchTerm: searchParams.get("searchTerm") || "",
    category: searchParams.get("category") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [category, setCategory] = useState(initialFilters.category);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  // Debounce the filter values
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [debouncedCategory] = useDebounce(category, 500);
  const [debouncedMaxPrice] = useDebounce(maxPrice, 500);

  // Update URL parameters when debounced values change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) {
      params.set("searchTerm", debouncedSearchTerm);
    } else {
      params.delete("searchTerm");
    }

    if (debouncedCategory) {
      params.set("category", debouncedCategory);
    } else {
      params.delete("category");
    }

    if (debouncedMaxPrice) {
      params.set("maxPrice", debouncedMaxPrice);
    } else {
      params.delete("maxPrice");
    }

    /**
     * query string 업데이트, router.replace => full page reload 방지
     * Perform a client-side navigation to the provided route without adding a new entry into the browser’s history stack.
     * [참조] https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
     *
     * { scroll: false } => maintain the scroll position
     *
     * page server component의 re-render을 발생시킴
     */
    router.replace(`?${params.toString()}`, { scroll: false }); //

    /*
    // re-render 발생 X
    const replaceUrl = `/pure-1?${params.toString()}`;
    window.history.replaceState(
      { ...window.history.state, as: replaceUrl, url: replaceUrl },
      "",
      replaceUrl
    );
    */
  }, [
    debouncedSearchTerm,
    debouncedCategory,
    debouncedMaxPrice,
    router,
    searchParams,
  ]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {/* Add your category options here */}
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        {/* ... */}
      </select>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
      />
    </div>
  );
};

export default ProductListFilters;
