import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items per page

  // Handle category filter changes
  const handleCategoryChange = e => {
    const value = e.target.value;
    setCategories(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
    setCurrentPage(1);
  };

  // Handle subcategory filter changes
  const handleSubCategoryChange = e => {
    const value = e.target.value;
    setSubCategories(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
    setCurrentPage(1);
  };

  // Handle sort option change
  const handleSortChange = e => setSortOption(e.target.value);

  // Handle page change
  const handlePageChange = pageNumber => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = e => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  // Apply filters, sorting, and pagination
  useEffect(() => {
    let filtered = products ? [...products] : [];

    // Filter by category
    if (categories.length > 0) {
      filtered = filtered.filter(item => categories.includes(item.category));
    }

    // Filter by subcategory
    if (subCategories.length > 0) {
      filtered = filtered.filter(item =>
        subCategories.includes(item.subCategory)
      );
    }

    // Apply search filter if search term is present and showSearch is true
    if (showSearch && search) {
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products based on the selected sort option
    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Set the filtered products
    setFilteredProducts(filtered);
  }, [products, categories, subCategories, sortOption]);

  // Pagination logic: Get the products for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt="Toggle Filters"
          />
        </p>

        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          {["Men", "Women", "Kids"].map(cat => (
            <label key={cat} className="flex gap-2">
              <input
                type="checkbox"
                value={cat}
                onChange={handleCategoryChange}
                checked={categories.includes(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">SUBCATEGORIES</p>
          {["Topwear", "Bottomwear", "Winterwear"].map(subCat => (
            <label key={subCat} className="flex gap-2">
              <input
                type="checkbox"
                value={subCat}
                onChange={handleSubCategoryChange}
                checked={subCategories.includes(subCat)}
              />
              {subCat}
            </label>
          ))}
        </div>
      </div>

      {/* Product listing section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={handleSortChange}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {currentProducts.length > 0 ? (
            currentProducts.map(item => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-4">
            {/* Items per page dropdown */}
            <div className="flex items-center gap-2">
              <label className="mr-2">Items per page:</label>
              <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={48}>48</option>
              </select>
            </div>

            {/* Pagination buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border px-4 py-2 bg-gray-200 rounded"
              >
                Prev
              </button>
              <div className="flex gap-2">
                {/* Display page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`border px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
