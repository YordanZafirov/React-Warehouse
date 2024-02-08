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
              {bestSellingProduct?.map((product: ProductReport) => (
                <tr key={product.id}>
                  <td>{product.product_name}</td>
                  <td>{product.best_selling}</td>
                </tr>
              ))}
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
              {clientWithMostOrders?.map((clients: ClientReport) => (
                <tr key={clients.id}>
                  <td>{clients.accountable_person}</td>
                  <td>{clients.orders}</td>
                </tr>
              ))}
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
              {highestStockPerWarehouse?.map((stock: Stock) => (
                <tr key={stock.id}>
                  <td>{stock.warehouse_name}</td>
                  <td>{stock.product_name}</td>
                  <td>{stock.total_quantity}</td>
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
