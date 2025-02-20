import ProductListFilters from "@/components/ProductListFilters";
import { TProductItem, TProductsResponse } from "@/types/product";

/**
 * 외부 모듈 X
 */

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
  //searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const queryObj = await searchParams;

  // Extract filters from searchParams
  const filters = {
    searchTerm: queryObj?.searchTerm || "",
    category: queryObj?.category || "",
    maxPrice: queryObj?.maxPrice || "",
  };

  // Construct the API endpoint with query parameters
  const params = new URLSearchParams(filters).toString();

  console.log("server component re-render....");
  console.log("params : ", params);

  // Fetch products from the API
  const res = await fetch(`http://localhost:3000/api/products?${params}`);
  const resJson: TProductsResponse = await res.json();
  const { items: products } = resJson.data;

  return (
    <div className="p-1">
      <ProductListFilters />
      <ul>
        {products.map((product: TProductItem) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
