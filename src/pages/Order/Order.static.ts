export interface Order {
  id: string;
  type: string;
  clientId: string;
  warehouseId: string;
  orderDetails?: string[];
  outGoingWarehouseId?: string;
  createdAt: string;
}