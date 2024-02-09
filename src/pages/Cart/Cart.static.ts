export interface Product {
  id: string;
  type: "solid" | "liquid";
  unitType: "kg" | "L";
  quantity?: number;
  unitPrice?: number;
  name: string;
}

export interface Order {
  type: string;
  clientId: string;
  warehouseId: string;
  outgoingWarehouse: string;
  product: Product[];
  errMsg: string;
  success: boolean;
}