import "./Styles.css";

const ProductsAddForm = ({ name, setName, image, setImage, price, setPrice }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setImage("");
    setName("");
    setPrice("");
  };
  return (
    <div>
      <form className="addProduct" onSubmit={handleSubmit}>
        <span>
          <label>Title</label>
          <label style={{ color: "red" }}>*</label>
        </span>
        <input
          type="text"
          placeholder="product title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span>
          <label>Image</label>
          <label style={{ color: "red" }}>*</label>
        </span>
        <input
          type="text"
          placeholder="image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <span>
          <label>price</label>
          <label style={{ color: "red" }}>*</label>
        </span>
        <input
          type="number"
          placeholder="ex: $120"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ProductsAddForm;
