import { useState } from "react";
import ProductsList from "./ProductsList";
import ProductsAddForm from "./ProductsAddForm";
import usePagination from "../CustomHooks/usePagination";
import useCachedProducts from "../CustomHooks/useCachedProducts";

const ProductsPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  );
  const [price, setPrice] = useState("");
  const [popUp, setPopUp] = useState(false);

  const { products, loading, addProduct } = useCachedProducts();
  const itemsPerPage = 5; // Number of items per page
  const { currentPage, totalPages, nextPage, prevPage, firstPage, lastPage } =
    usePagination(itemsPerPage, products.length);

  const handleAdd = async () => {
    const newUser = {
      title: name,
      image: image,
      price: price,
    };

    await addProduct(newUser);
    setName("");
    setImage("");
    setPrice("");
  };

  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="loading">Loading</div>;
  }

  return (
    <>
      <header className="header">Shopping Cart</header>
      <div className="totalProducts">{`Total Number of products - ${products.length}`}</div>
      <div className="formAlignment">
        <div>
          {popUp && (
            <ProductsAddForm
              name={name}
              setName={setName}
              image={image}
              setImage={setImage}
              price={price}
              setPrice={setPrice}
              onSave={handleAdd}
            />
          )}
        </div>
        <div className="buttonHeader">
          {popUp && (
            <button className="cancelBtn" onClick={() => setPopUp(false)}>
              Close
            </button>
          )}
          <button
            className="addBtn"
            onClick={popUp ? handleAdd : () => setPopUp(true)}
            disabled={popUp ? !name || !image || !price : false}
          >
            {popUp ? "Submit Products" : "Add New Products"}
          </button>
        </div>
      </div>
      <div>
        <div className="productList">
          {currentItems.map((data) => (
            <ProductsList key={data.id} products={data} />
          ))}
        </div>
        <div className="paginationFooter">
          {currentPage > 1 && (
            <>
              <button
                className="pageButton"
                onClick={firstPage}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button
                className="pageButton"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </>
          )}
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pageButton"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="pageButton"
            onClick={lastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
