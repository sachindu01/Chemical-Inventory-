import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopConext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Inventory = () => {

  const { products,search} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState(products);
  const [category,setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexofLastProduct = currentPage * productsPerPage;
  const indexofFirstProduct = indexofLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexofFirstProduct, indexofLastProduct);
 
  const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
  };

  const subCategoryOptions = {
    Organic: [
    "Alkanes",
    "Alkenes",
    "Alkynes",
    "Alcohols",
    "Ethers",
    "Amines",
    "Amino Acids",
    "Carboxylic Acids",
    "Esters",
    "Ketones",
    "Aldehydes",
    "Nitriles",
    "Phenols",
    "Polymers",
    "Aromatic Compounds"
  ],
  Inorganic: [
    "Acid",
    "Base",
    "Salt",
    "Oxide",
    "Hydroxide",
    "Sulfide",
    "Phosphate",
    "Nitrate",
    "Halide",
    "Carbonate",
    "Silicate",
    "Metal",
    "Non-Metal",
    "Other"
  ],
    
  };

  const toggleCategory = (e) => {
    const selectedCategory = e.target.value;
    if (category.includes(selectedCategory)) {
      setCategory([]); // Deselect the category if it's already selected
      setSubCategory([]); // Reset subcategory when category is deselected
    } else {
      setCategory([selectedCategory]); // Replace the category with the newly selected one
      setSubCategory([]); // Reset subcategory when a new category is selected
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const renderSubCategoryOptions = () => {
    if (category.length === 1) {
      const selectedCategory = category[0];
      const subCategories = subCategoryOptions[selectedCategory];

      if (subCategories) {
        return (
          <div className="border border-gray-300 pl-5 py-3 my-5">
            <p className="mb-3 text-sm font-medium">SUB CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light">
              {subCategories.map((subCat, index) => (
                <p key={index} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={subCat}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(subCat)}
                  />
                  {subCat}
                </p>
              ))}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  // Determine the text for Title component based on selected category and subcategory
  const getTitleText = () => {
    const selectedCategory = category.length > 0 ? category[0] : 'ALL';
    const selectedSubCategory = subCategory.length > 0 ? subCategory.join(' / ')  : 'CHEMICALS'; // Show the first selected subcategory, or default

    return { text1: selectedCategory, text2: selectedSubCategory };
  };

  const titleText = getTitleText();

  // Function to apply all filters
  const applyFilter = () => {
    let productsCopy = [...products];

    // Apply Search filter
    if(search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply availability filter
    productsCopy = productsCopy.filter((product) => {
      if (availabilityFilter === 'All') {
        return true;
      } else if (availabilityFilter === 'In Stock') {
        return product.availability;
      } else if (availabilityFilter === 'Out of Stock') {
        return !product.availability;
      }
      return true;
    });

    // Update the filtered products and reset pagination
    setFilterProducts(productsCopy);
    setCurrentPage(1);
  };

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,availabilityFilter,search,products])

    // Function to handle availability filter change
    const handleAvailabilityChange = (e) => {
      setAvailabilityFilter(e.target.value);
    };
 

  return (
    <div> <SearchBar/>
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10'>
      {/* Filter Options */}
      <div className='min-w-60'> 
      <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2' >FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Organic"} checked={category.includes("Organic")} onChange={toggleCategory}/>Organic
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Inorganic"} checked={category.includes("Inorganic")} onChange={toggleCategory}/>Inorganic
            </p>
            
          </div>
        </div>
         {/*SubCategory filter */}
         {renderSubCategoryOptions()}
        
      </div>
      {/*Right Side*/}
      <div className='flex-1'>
              <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={titleText.text1.toUpperCase()} text2={titleText.text2.toUpperCase()} />
               {/*Product Availability */}
                <select id="availability" value={availabilityFilter} onChange={handleAvailabilityChange}
                className='border-2 border=grat-300 text-sm px-2 sm:w-auto"' >  
                  <option value="All">All</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>
              {/*Map Products */}
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6'>
                {
                  currentProducts.map((item,index)=>(
                    <ProductItem key={index} name={item.name} image={item.image} availability ={item.availability} id= {item._id} />
                  ))
                }

              </div>
              {/* Pagination */}
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={filterProducts.length}
                paginate={paginate}
                activePage={currentPage}
              />
      </div>



      </div>
    </div>
    
  )
}

export default Inventory
