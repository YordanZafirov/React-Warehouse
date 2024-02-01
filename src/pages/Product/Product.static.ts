export interface Product {
  name: string;
  type: "solid" | "liquid";
  unitType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
}