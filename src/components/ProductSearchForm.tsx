"use client";

import { useQueryState } from "nuqs";

const ProductSearchForm = () => {
  const [query, setQuery] = useQueryState("search", {
    //defaultValue: "test", // 디폴트값 설정해도 url 에 반영되지 않음, setQuery() 시 발생
    throttleMs: 500,
  }); // Automatically manages URL state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to manually update the URL; it's handled by useQueryState
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query ? query : ""}
        onChange={(e) => setQuery(e.target.value)} // Automatically updates the URL
        placeholder="Search..."
      />
      <button type="submit" className="border py-1 px-2 rounded-md">
        Search
      </button>
    </form>
  );
};

export default ProductSearchForm;
