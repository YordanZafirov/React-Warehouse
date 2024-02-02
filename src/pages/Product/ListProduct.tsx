import { CenteredH1, StyledTable } from "../../components/table/Listing.style";
import { useCart } from "../../context/CartContext";
import useProduct from "../../hooks/Product/Product.hook";
import { Product } from "./Product.static";

const ListProducts = () => {
  const { addItem } = useCart();
  const { products, error, deleteProduct } = useProduct();

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

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
          {products?.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.unitType}</td>
              <td>{product.createdAt.toLocaleString()}</td>
              <td>{product.updatedAt.toLocaleString()}</td>
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
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListProducts;
