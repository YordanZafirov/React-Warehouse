export interface Order {
  id: string;
  clientId: string;
  warehouseId: string;
  orderDetails?: string[];
  outGoingWarehouseId?: string;
  createdAt: string;
}