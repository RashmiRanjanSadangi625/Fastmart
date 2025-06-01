    import { useEffect, useState } from "react";
    import { useSearchParams } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import { searchedProducts as searchedProductsAction } from "../../../State/Product/Action";
import ProductCard from "./ProductCard";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/react'
import { ChevronDownIcon } from "lucide-react";

    const SearchedProducts = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { searchedProducts } = useSelector((store) => store.products); // correct key
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || 1);
    const gender = searchParams.get("gender");

    useEffect(() => {
        if (query?.trim()) {
          dispatch(searchedProductsAction(query,gender,page ));
        }
      }, [query, page, searchParams,dispatch]);  

    useEffect(() => {
        setTotalPages(Math.ceil((searchedProducts?.total || 0) / 15));
    }, [searchedProducts]);

    const handlePageChange = (newPage) => {
        setSearchParams({ query, gender,page: newPage });
    };

    // console.log('searchedProducts',searchedProducts);
    

    return (
        <div className="p-4">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold mb-4">Search results for: {query}</h1>
                <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">

                      <MenuItem key='all'>
                            <a  onClick={() => setSearchParams({ query,page})} className= 'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden'>
                            All
                            </a>
                      </MenuItem>
                      <MenuItem key='men'>
                        <a  onClick={() => setSearchParams({ query, gender:'Men',page})} className= 'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden'>
                          Men
                        </a>
                      </MenuItem>
                      <MenuItem key='women'>
                        <a  onClick={() => setSearchParams({ query, gender:'Women',page})} className= 'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden'>
                          Women
                        </a>
                      </MenuItem>
                     </div>
                </MenuItems>
              </Menu>
            </div>
        <div className="lg:col-span-4 w-full">
            <div className='flex flex-wrap justify-center bg-white py-5'>
                 {searchedProducts?.products?.map((product) => <ProductCard product={product}/>)}
            </div>
        </div>

       

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchedProducts?.products?.map((product) => (
            <div key={product._id} className="border p-3 rounded shadow">
                <img
                src={product.imageUrl}
                alt={product.title}
                className="h-40 object-cover w-full"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p>{product.brand}</p>
                <p>₹{product.discountedPrice}</p>
            </div>
            ))}
        </div> */}

        <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
            <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded ${
                idx + 1 === page ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
                {idx + 1}
            </button>
            ))}
        </div>
        </div>
    );
    };

    export default SearchedProducts;
