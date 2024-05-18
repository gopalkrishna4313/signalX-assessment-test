import { useState, useEffect } from "react";

// Custom hook for caching product data
const useCachedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCacheData = async () => {
      const cachedData = localStorage.getItem("cachedProducts");
      if (cachedData) {
        setProducts(JSON.parse(cachedData));
        setLoading(false);
      }

      const fetchData = await fetch("https://fakestoreapi.com/products");
      const res = await fetchData.json();
      const limit = res.splice(0, 10);

      setProducts(limit);
      localStorage.setItem("cachedProducts", JSON.stringify(limit));
      setLoading(false);
    };

    fetchAndCacheData();
  }, []);

  const addProduct = async (newProduct) => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const addedProduct = await response.json();
    const updatedProducts = [...products, addedProduct];
    setProducts(updatedProducts);
    localStorage.setItem("cachedProducts", JSON.stringify(updatedProducts));
  };

  return { products, loading, addProduct };
};

export default useCachedProducts;
