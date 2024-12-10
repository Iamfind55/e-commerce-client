import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/pagination";
import useFilter from "@/lib/useFilter";

const products = [
  {
    id: "123",
    price: "250",
    name: "Product1",
    description: "This is the first product in our system now.",
  },
  {
    id: "124",
    price: "300",
    name: "Product2",
    description: "This is the second product, a little better.",
  },
  {
    id: "125",
    price: "150",
    name: "Product3",
    description: "The third product, perfect for casual use.",
  },
  {
    id: "126",
    price: "200",
    name: "Product4",
    description: "Our fourth product, optimized for comfort.",
  },
  {
    id: "127",
    price: "350",
    name: "Product5",
    description: "The fifth product, top-of-the-line quality.",
  },
  {
    id: "128",
    price: "400",
    name: "Product6",
    description: "The sixth product, with premium features.",
  },
  {
    id: "1232",
    price: "250",
    name: "Product1",
    description: "This is the first product in our system now.",
  },
  {
    id: "1242",
    price: "300",
    name: "Product2",
    description: "This is the second product, a little better.",
  },
  {
    id: "1252",
    price: "150",
    name: "Product3",
    description: "The third product, perfect for casual use.",
  },
  {
    id: "1262",
    price: "200",
    name: "Product4",
    description: "Our fourth product, optimized for comfort.",
  },
];
export default function AllProductComponent() {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              All products:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
            <div className="w-full flex items-center justify-center mb-4">
              <Pagination
                filter={filter}
                totalPage={20}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
