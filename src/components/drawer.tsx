import { useEffect } from "react";
import { BackIcon, ShopIcon } from "@/icons/page";
import React from "react";
import { Link } from "@/navigation";
import { useRouter } from "next/navigation";

type DrawerTypes = {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
};

type Subcategory = {
  title: string;
  items: string[];
};

type Category = {
  label: string;
  icon: React.ReactNode;
  subcategories: Subcategory[];
};

const Drawer = ({ isOpen, children, onClose }: DrawerTypes) => {
  const router = useRouter();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose && onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories: Category[] = [
    {
      label: "Men handbages and accessories",
      icon: <ShopIcon />,
      subcategories: [
        {
          title: "Men's Clothing",
          items: [
            "All Men's Clothing",
            "New Arrivals",
            "Blazers & Sport Coats",
            "Coats & Jackets",
          ],
        },
        {
          title: "Men's Active & Outdoor",
          items: [
            "All Activewear",
            "Outdoor Apparel & Shoes",
            "Sports Fan Shop",
          ],
        },
        {
          title: "Men's Shoes",
          items: [
            "All Men's Shoes",
            "Athletic Shoes & Sneakers",
            "Boots",
            "Casual Shoes",
          ],
        },
        {
          title: "Men's Shoes",
          items: [
            "All Men's Shoes",
            "Athletic Shoes & Sneakers",
            "Boots",
            "Casual Shoes",
          ],
        },
      ],
    },
    {
      label: "Men handbages and accessories",
      icon: <ShopIcon />,
      subcategories: [
        {
          title: "Men's Clothing",
          items: [
            "All Men's Clothing",
            "New Arrivals",
            "Blazers & Sport Coats",
            "Coats & Jackets",
          ],
        },
        {
          title: "Men's Active & Outdoor",
          items: [
            "All Activewear",
            "Outdoor Apparel & Shoes",
            "Sports Fan Shop",
          ],
        },
        {
          title: "Men's Shoes",
          items: [
            "All Men's Shoes",
            "Athletic Shoes & Sneakers",
            "Boots",
            "Casual Shoes",
          ],
        },
        {
          title: "Men's Shoes",
          items: [
            "All Men's Shoes",
            "Athletic Shoes & Sneakers",
            "Boots",
            "Casual Shoes",
          ],
        },
      ],
    },
    {
      label: "Women",
      icon: <ShopIcon />,
      subcategories: [
        {
          title: "Women's Clothing",
          items: ["Dresses", "Tops", "Skirts", "Pants"],
        },
        {
          title: "Women's Shoes",
          items: ["Heels", "Flats", "Boots", "Sneakers"],
        },
      ],
    },
  ];

  const handleNavigateToCategory = () => {
    router.push("/category");
    onClose && onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50`}
    >
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-screen p-2 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-80 shadow`}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <div className="flex justify-end items-center mb-2">
          <button className="rounded" onClick={onClose}>
            <BackIcon size={20} className="text-gray-500" />
          </button>
        </div>
        <ul className="flex flex-col text-gray-500">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-200"
              onMouseEnter={() => setSelectedCategory(category)}
            >
              {category.icon}
              <span className="text-sm">{category.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {selectedCategory && (
        <div
          ref={drawerRef}
          className="fixed top-3 left-25 h-auto w-auto p-4 rounded bg-white shadow-lg"
        >
          <div className="grid grid-cols-4 gap-4">
            {selectedCategory.subcategories.map((subcategory, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-700 text-sm">
                  {subcategory.title}
                </h4>
                <ul className="pl-2 flex items-start justify-start flex-col cursor-pointer gap-2">
                  {subcategory.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-500 rounded hover:text-neon_pink"
                      onClick={() => handleNavigateToCategory()}
                    >
                      {item}
                      {/* <Link href="/category">{item}</Link> */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawer;
