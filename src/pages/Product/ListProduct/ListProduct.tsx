import {
  CenteredH1,
  StyledTable,
} from "../../../components/table/Listing.style";
import { useCart } from "../../../context/CartContext";
import useToken from "../../../hooks/Token/Token.hook";
import { Product } from "./Product.static";
import useDeleteProduct from "./ListProduct.logic";
import useGetProduct from "../../../hooks/Product/Product.hook";

const ListProducts = () => {
  const { addItem } = useCart();
  const { products, error } = useGetProduct();
  const { deleteProduct } = useDeleteProduct();
  const decodedToken = useToken();

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div>
      {!products && <p>No products found</p>}
      <CenteredH1>List of all products</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Unit Type</th>
            <th>Created At</th>
            <th>Updated At</th>
            {decodedToken?.role !== "VIEWER" && <th>Actions</th>}
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
              {decodedToken?.role !== "VIEWER" && (
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
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListProducts;
