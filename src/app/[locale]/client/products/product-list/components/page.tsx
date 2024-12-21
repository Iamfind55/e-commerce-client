// components
import Select from "@/components/select";
import { SearchIcon } from "@/icons/page";
import DatePicker from "@/components/datePicker";

// utils
import { product_status, stock } from "@/utils/option";
import ShopProductCard from "@/components/shopProductCard";
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
];
export default function ProductListDetail() {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-start justify-start gap-2">
          <Select
            name="status"
            title="Status"
            option={product_status}
            className="h-8"
          />
          <Select name="stock" title="Stock" option={stock} className="h-8" />
        </div>
        <div className="flex items-end justify-start gap-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon size={16} className="text-neon_pink" />
            </div>
            <input
              required
              type="text"
              id="search"
              placeholder="Search...."
              className="h-8 bg-white text-gray-500 border text-xs rounded block w-auto ps-10 p-2 focus:outline-none focus:ring-1"
            />
          </div>
          <DatePicker name="start_date" title="Start date" className="h-8" />
          <DatePicker name="end_date" title="End date" className="h-8" />
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mt-4 mb-2">List of all products:</p>
        <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
          {products.map((product) => (
            <ShopProductCard
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
    </>
  );
}
