import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { mens_kurta } from '../../../Data/men_kurta'
import ProductCard from './ProductCard'
import { filters, singleFilters } from './FilterData'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {findProducts} from '../../../State/Product/Action.js'
import Pagination from '@mui/material/Pagination';
import { api } from '../../../config/apiConfig.js'
import { FIND_PRODUCTS_BY_FAILURE, FIND_PRODUCTS_BY_SUCCESS } from '../../../State/Product/ActionType.js'

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const location = useLocation()
  const navigate =useNavigate();
  const param=useParams();
  const dispatch=useDispatch();
  const {products} = useSelector(store=>store)


  // Param values for filter
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colors=searchParams.get("color")
  const size=searchParams.get("size")
  const price= searchParams.get("price");
  const discountedPrice = searchParams.get("discountedPrice")
  const sortValue= searchParams.get("sort")
  const pageNumber = searchParams.get("page") || 1;
  const stock =searchParams.get("stock");

  useEffect(()=>{

    const[minPrice,maxPrice] = price === null?[0,10000]:price.split("-").map(Number);
    // console.log(param.thirdLvelCategory);
  
    const data={
      category:param.levelThre,
      colors,
      sizes:size || [],
      minPrice,
      maxPrice,
      discountedPrice:discountedPrice || 0,
      sort:sortValue || "price-low",
      pageNumber:pageNumber,
      pageSize:10,
      stock:stock
     }
    //  console.log('data',data);
     dispatch(findProducts(data));

  },[param.levelThre,
    colors,
    size,
    price,
    discountedPrice,
    sortValue,
    pageNumber,
    stock])

    const handleFilter=(value,sectionId)=>
  {
    const searchParams= new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId)

    if(filterValue.length >0 && filterValue[0].split(",").includes(value))
        {
            filterValue=filterValue[0].split(",").filter((item)=>item!==value);
        
            if(filterValue.length === 0)
            {
                searchParams.delete(sectionId)
            }
        }
        else
        {
            filterValue.push(value);
        }
        if(filterValue.length >0)
        {
            searchParams.set(sectionId,filterValue.join(","));
        }
        const query = searchParams.toString();
        console.log('searchParams',query)  
        navigate({search:`?${query}`})
        
  }

  const handleRadioFilterChange= (e,sectionId)=>
  {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId,e.target.value);
    const query = searchParams.toString();
    navigate({search:`?${query}`})
  }

  const handlePaginationChange = (event, value) => {
    // const searchParams = new URLSearchParams(location.search);
    // // const[minPrice,maxPrice] = price === null?[0,10000]:price.split("-").map(Number);
    // // const data={
    // //   category:param.levelThre,
    // //   colors,
    // //   sizes:size || [],
    // //   minPrice,
    // //   maxPrice,
    // //   discountedPrice:discountedPrice || 0,
    // //   sort:sortValue || "price-low",
    // //   pageNumber:value,
    // //   pageSize:10,
    // //   stock:stock
    // //  }
    // //  console.log('data',data);
    // //  dispatch(findProducts(data));
    // // console.log('location.search',location.search)
    // searchParams.set("pageNumber", value);
    // searchParams.set("levelThre", param.levelThre);
    // // console.log('searchParams',searchParams)
    // const query = searchParams.toString();
    const queryFormat={
        category:param.levelThre,
        pageNumber:value,
        pageSize:10,
       }
    // console.log('query',queryFormat)
     dispatch(findProducts(queryFormat));    
  };

  const [productss, setProductss] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  const fetchProducts = async () => 
    {
    
    const searchParams = new URLSearchParams(location.search);
    const pageNumber = Number(searchParams.get("pageNumber")) || 1; // Ensure it's a number
    setCurrentPage(pageNumber); // Sync state with URL

    try {
      const { data } = await api.get("/api/products", { params: Object.fromEntries(searchParams) });

      console.log("API Response:", data);
      setProductss(data.content);
      setTotalPages(data.totalPages);

      dispatch({ type: FIND_PRODUCTS_BY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIND_PRODUCTS_BY_FAILURE, payload: error.message });
    }
   
  };

  fetchProducts();
}, [location.search]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              
              <form className="mt-4 border-t border-gray-200">
               
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
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
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

             
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>          

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <div className="hidden lg:block lg:col-span-1 w-full lg:w-64">
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg opacity-80 font-bold'>Filters</h1><FilterListIcon/>
                </div>
              
              <>
              
              <form className="hidden lg:block">
              {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                 onChange={()=>handleFilter(option.value,section.id)}
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                {singleFilters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                   
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <FormLabel className="font-medium" sx={{color:'black'}}id="demo-radio-buttons-group-label">{section.name}</FormLabel>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                      <FormControl>
                      <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                                   <>
                                    <FormControlLabel onChange={(e)=>handleRadioFilterChange(e,section.id)} value={option.value} control={<Radio />} label={option.label} />                                    
                                   </>                               
                          </div>
                        ))}
                        </RadioGroup>
                        </FormControl>
                      </div>
                    </DisclosurePanel>
                    
                  </Disclosure>
                ))}
              </form>
              </>
              </div>
              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className='flex flex-wrap justify-center bg-white py-5'>
                    {products.products && products.products?.content?.map((item)=><ProductCard product={item}/>)}
                </div>
              </div>
            </div>
          </section>
          <section className='w-full px-[3.6rem]'>
            <div className='px-4 py-5 flex justify-center'>
            <Pagination count={products.products?.totalPages} color="secondary" onChange={handlePaginationChange}/>            
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
