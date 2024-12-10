import React, { useState, useEffect } from 'react';

function Card() {
  const [products, setProducts] = useState([]); // State to store the fetched products
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch data from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Call the fetchProducts function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">All Products</h1> {/* Added heading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col h-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-contain mb-4"
            />
            <div className="flex flex-col justify-between flex-grow">
              {/* Title with a fixed height */}
              <h2 className="text-xl font-semibold truncate">{product.title}</h2>
              <p className="text-lg text-gray-700 mt-2">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-sm">4.5 out of 5</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add to Cart</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
