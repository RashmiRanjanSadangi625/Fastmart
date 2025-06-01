import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Avatar, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";

import { deepPurple } from "@mui/material/colors";
import {navigation} from "./navigationData"
import Logo  from "../../../assets/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../../customers/Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";
import { getCart } from "../../../State/Cart/Action";
import { Search } from 'lucide-react';
import { searchedProducts } from "../../../State/Product/Action";


function classNames(...classes) { 
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openAuthModal,setOpenAuthModal]=useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const navigate=useNavigate();
  const jwt=localStorage.getItem("jwt");
  const {auth,cart,products}=useSelector(store=>store)
  const dispatch=useDispatch();
  const location=useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery,setSearchQuery] = useState('');
  


  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClickOnMobileMenu = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };



  useEffect(()=>
    {
      if(jwt){dispatch(getUser(jwt))}
  
    },[jwt,auth.jwt])

  useEffect(()=>
    {
      if(auth?.user)
      {
        handleClose();
      }
      if(location.pathname==="/login" || location.pathname==="/register")
      {
        navigate(-1);
      } 
      dispatch(getCart())
  
    },[auth?.user])

    const handleLogout=()=>
    {
      dispatch(logout());
      handleCloseUserMenu();
      setOpen(false)
      navigate("/");
    }

    const handleOrderNavigate=()=>
      {
        navigate("/account/order");
        setOpen(false)
        setAnchorEl(null);
      }

      const handleAccountNavigate=()=>
        {
          navigate("/account/profile");
          setOpen(false)
          setAnchorEl(null);
        }

    // console.log("cart",cart);
    const toggleSearch = () => {
      setShowSearch(prev => !prev);
    };

    const handleSearch = async ()=>{

      if (searchQuery.trim()) {
        navigate(`/searched-products?query=${searchQuery}&page=1`);
      }

      // console.log(searchQuery);
      // dispatch(searchedProducts(searchQuery))
      // navigate('../Products')
    }
    // console.log("cart",products);
    

  return (
    <div className="">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {auth.user?.firstName ? (
                    <div className=" bg-blue-950 p-5 rounded-2xl">
                      <div className="cursor-pointer  text-white font-semibold p-2 text-xl">
                        <p>Hello {auth.user.firstName} !</p>
                      </div> 
                      <div onClick={()=>{navigate('/') ; setOpen(false)}} className="cursor-pointer font-semibold text-xl text-white p-2 hover:bg-gray-400 hover:text-white" >Home</div>
                      <div onClick={()=>{navigate('/cart'); setOpen(false)}} className="cursor-pointer font-semibold text-xl text-white p-2  hover:bg-gray-400 hover:text-white" >Cart</div>
                      <div onClick={handleAccountNavigate} className="cursor-pointer font-semibold p-2 text-white text-xl hover:bg-gray-400 hover:text-white">
                          {true ?.role === "ROLE_ADMIN"
                            ? "Admin Account"
                            : "Account"}
                      </div>
                      <div onClick={handleOrderNavigate} className="cursor-pointer font-semibold p-2 text-white text-xl hover:bg-gray-400 hover:text-white">
                          {true ?.role === "ROLE_ADMIN"
                            ? "Admin Dashboard"
                            : "My Orders"}
                      </div>
                      <div onClick={handleLogout} className="cursor-pointer font-semibold p-2 text-xl text-white hover:bg-gray-400 hover:text-white">Logout</div>
                    </div>
                  ) : (<div className="flex items-center justify-center ">
                     <Button type="button"
                    onClick={handleOpen}
                    sx={{color:"white",fontWeight:'600',fontSize:'15px', bgcolor:'#162556',padding:'10px'}}>
                      Login 
                    </Button>
                  </div>
                   
                  )}
                </div>
                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClickOnMobileMenu(
                                                      category,
                                                      section,
                                                      item
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div> */}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-blue-950 text-white">

        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-5">
              <button
                type="button"
                className="rounded-md bg-blue-950 p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6 bg-blue-950 border-1 border-white rounded hover:bg-gray-300 cursor-pointer" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
              
                  <div onClick={()=>navigate("/")}>
                  <span className="sr-only">FastMart</span>
                  <img
                      src={Logo} 
                      alt="FastMart Logo"
                      draggable="false"
                      className="h-8 w-40" // Adjust height for a better fit
                    />
                  </div>  
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-white"
                                  : "border-transparent text-white hover:text-gray-400 cursor-pointer",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {/* {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white hover:text-gray-400"
                    >
                      {page.name}
                    </a>
                  ))} */}
                </div>
              </Popover.Group>

              {/* //Searchbar section */}

              <div className="flex-1 flex justify-center">
                {showSearch && (
                  <div className="flex items-center justify-center border-2 border-white rounded-xl">
                      <input
                      type="text"
                      name='query'
                      placeholder="Search..."
                      onChange={(e)=>setSearchQuery(e.target.value)}
                      className="md:w-100 sm:w-50 px-3 py-1 rounded-md border border-white bg-white text-black"
                      />
                    <MagnifyingGlassIcon
                    className="h-8 w-8 cursor-pointer hover:text-gray-400"
                    aria-hidden="true"
                    onClick={handleSearch}
                    />
                </div>
                )}
                
              </div>

              

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: "white",
                          color: "black",
                          cursor: "pointer",
                        }}
                      >
                       {auth.user.firstName[0].toUpperCase() + "" +auth.user.lastName[0]}
                      </Avatar>
                      {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleAccountNavigate}>
                          {true ?.role === "ROLE_ADMIN"
                            ? "Admin Account"
                            : "Account"}
                        </MenuItem>
                        <MenuItem onClick={handleOrderNavigate}>
                          {true ?.role === "ROLE_ADMIN"
                            ? "Admin Dashboard"
                            : "My Orders"}
                        </MenuItem>
                        
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button type="button"
                    onClick={handleOpen}
                    className="text-xl font-medium text-white hover:text-gray-400"
                    sx={{color:"white"}}>
                      Login
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="flex items-center lg:ml-6">

                
                
                  <p onClick={toggleSearch} className="p-2 text-white hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </p>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <p onClick={()=>navigate('/cart')}>
                  <Button
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-200"
                      aria-hidden="true"
                    />
            
                     {cart?.cart?.totalItem && cart?.cart?.totalItem > 0 ?
                            <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-200">{cart?.cart?.totalItem}</span>:
                            <span></span>
                     }
                    
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal}/>
    </div>
  );
}