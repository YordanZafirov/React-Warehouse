import { useEffect } from "react";
import { CenteredH1, StyledTable } from "../../components/table/Listing.style";
import { useCart } from "../../context/CartContext";
import useProduct from "../../hooks/Product/Product.hook";

const ListProducts = () => {
  const { addItem } = useCart();
  const { products, getProduct, handleDelete } = useProduct();

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <CenteredH1>List of all products</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Unit Type</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.unitType}</td>
              <td>{product.createdAt}</td>
              <td>{product.updatedAt}</td>
              <td>
                <button
                  className="add"
                  onClick={() => {
                    addItem(product.id, product.type);
                  }}
                >
                  Add to cart
                </button>
                <button className="update">Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListProducts;
