export interface Product {
  name: string;
  type: "solid" | "liquid";
  unitType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string | null;
  id: string;
}