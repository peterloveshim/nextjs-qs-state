export type TProductItem = {
  id: number;
  name: string;
};

export type TProductsResponse = {
  response: string;
  data: {
    items: TProductItem[];
  };
};
