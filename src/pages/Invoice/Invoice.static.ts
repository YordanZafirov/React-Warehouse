import { Order } from "../Order/Order.static";
import { Product } from "../Product/ListProduct/Product.static";

export interface InvoiceType {
  id: string;
  number: string;
  orderId: string;
}

export interface OrderDetail {
  createdAt: string;
  id: string;
  orderId: Order;
  productId: Product;
  quantity: number;
  unitPrice: number;
  updatedAt: string;
}