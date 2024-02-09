import Loader from "../../components/loader/Loader";
import useReports from "./Report.logic";
import { CenteredH1, StyledTable } from "../../components/table/Table.style";
import { ReportContainer } from "./Report.style";
import { ClientReport, ProductReport, Stock } from "./Report.static";

const Report = () => {
  const {
    bestSellingProduct,
    clientWithMostOrders,
    highestStockPerWarehouse,
    isLoading,
    error,
  } = useReports();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  return (
    <div>
      <CenteredH1>Reports</CenteredH1>

      <ReportContainer>
        <div>
          <h2>Best Selling Product</h2>
          <StyledTable>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingProduct?.map(
                (product: ProductReport, index: number) => (
                  <tr key={`${product.id}-${index}`}>
                    <td data-label="Product Name:">{product.product_name}</td>
                    <td data-label="Quantity Sold:">{product.best_selling}</td>
                  </tr>
                )
              )}
            </tbody>
          </StyledTable>
        </div>

        <div>
          <h2>Client With Most Orders</h2>
          <StyledTable>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Number of Orders</th>
              </tr>
            </thead>
            <tbody>
              {clientWithMostOrders?.map(
                (clients: ClientReport, index: number) => (
                  <tr key={`${clients.id}-${index}`}>
                    <td data-label="Client Name:">{clients.accountable_person}</td>
                    <td data-label="Number of Orders:">{clients.orders}</td>
                  </tr>
                )
              )}
            </tbody>
          </StyledTable>
        </div>

        <div>
          <h2>Highest Stock Per Warehouse</h2>
          <StyledTable>
            <thead>
              <tr>
                <th>Warehouse Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {highestStockPerWarehouse?.map((stock: Stock, index: number) => (
                <tr key={`${stock.id}-${index}`}>
                  <td data-label="Warehouse Name:">{stock.warehouse_name}</td>
                  <td data-label="Product Name:">{stock.product_name}</td>
                  <td data-label="Quantity:">{stock.max_quantity}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </ReportContainer>
    </div>
  );
};

export default Report;
