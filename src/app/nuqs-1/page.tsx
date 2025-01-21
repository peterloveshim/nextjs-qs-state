import { createLoader, SearchParams, parseAsString } from "nuqs/server";

import ProductSearchForm from "@/components/ProductSearchForm";
import { loadSearchParams } from "./search-params";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const { latitude, longitude } = await loadSearchParams(searchParams);

  console.log("server component re-render....");
  console.log("latitude : ", latitude);
  console.log("longitude : ", longitude);

  return (
    <div className="p-1">
      <h1>Product Search</h1>
      <ProductSearchForm />
    </div>
  );
}
