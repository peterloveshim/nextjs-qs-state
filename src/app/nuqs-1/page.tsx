import { createLoader, SearchParams, parseAsString } from "nuqs/server";

import ProductSearchForm from "@/components/ProductSearchForm";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  param1: parseAsString.withDefault(""),
  param2: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const { param1, param2 } = await loadSearchParams(searchParams);

  console.log("server component re-render....");
  console.log("param1 : ", param1);
  console.log("param2 : ", param2);

  return (
    <div className="p-1">
      <h1>Product Search</h1>
      <ProductSearchForm />
    </div>
  );
}
