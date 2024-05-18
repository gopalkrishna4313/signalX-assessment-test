import "./Styles.css";
import useLazyLoad from "../CustomHooks/useLazyLoad";

const ProductsList = ({ products }) => {
  const { loaded, imageSrc } = useLazyLoad(products.image);
  return (
    <>
      <div className="gridContainer">
        <div>
          {!loaded && <div className="placeholder">Loading...</div>}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={products.title}
              width={120}
              height={120}
              className={`productImage ${loaded ? "fadeIn" : ""}`}
            />
          )}
        </div>
        <div>{`Id - ${products.id}`}</div>
        <div>{products.title}</div>
        <div className="price">{`Price   -  $ ${products.price}`}</div>
      </div>
    </>
  );
};

export default ProductsList;
