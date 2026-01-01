import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";
function Product({ category }) {
  const { isPending, data } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getAllProducts({ category }),
  });

  const products = data?.message?.products ?? [];

  return (
    <div className="relative mb-8 min-h-[400px]">
      {/* Spinner overlay */}
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Spinner />
        </div>
      )}

      {/* Product grid stays mounted */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default Product;
