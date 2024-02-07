import { CenteredH1, StyledTable } from "../../../components/table/Table.style";
import { useCart } from "../../../context/CartContext";
import useToken from "../../../hooks/Token/Token.hook";
import { Product } from "./Product.static";
import useDeleteProduct from "./DeleteProduct.logic";
import useGetProduct from "../../../hooks/Product/Product.hook";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProducts = () => {
  const { addItem } = useCart();
  const { products, error } = useGetProduct();
  const { deleteProduct, permanentDeleteProduct } = useDeleteProduct();
  const decodedToken = useToken();

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div>
      {!products && <p>No products found</p>}
      <ToastContainer />
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
              <td data-label="Name:">{product.name}</td>
              <td data-label="Type:">{product.type}</td>
              <td data-label="Unit Type:">{product.unitType}</td>
              <td data-label="Created at:">{product.createdAt.toLocaleString()}</td>
              <td data-label="Updated at:">{product.updatedAt.toLocaleString()}</td>
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
                  <Link to={`/product/${product.id}`} className="update">
                    Edit
                  </Link>
                  <button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                  {decodedToken?.role === "OWNER" && (
                    <button
                      className="permanent-delete"
                      onClick={() => permanentDeleteProduct(product.id)}
                    >
                      Permanent Delete
                    </button>
                  )}
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
