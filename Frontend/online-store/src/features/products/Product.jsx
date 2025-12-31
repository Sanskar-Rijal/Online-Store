import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";

function Product({ category }) {
  const { isPending, data, error } = useQuery({
    queryKey: ["products", category], //unique key to identify the query
    queryFn: () => getAllProducts({ category }),
  });

  if (isPending) {
    return (
      <div className="flex justify-between">
        <Spinner />;
      </div>
    );
  }
  const product = data.message.products;

  console.log(error);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {product.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Product;
