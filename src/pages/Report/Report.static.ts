export interface ProductReport {
  id: number;
  product_name: string;
  best_selling: string;  
}

export interface ClientReport {
  id: number;
  accountable_person: string;
  orders: string;
}

export interface Stock {
  id: number;
  warehouse_name: string;
  product_name: string;
  max_quantity: string;
}