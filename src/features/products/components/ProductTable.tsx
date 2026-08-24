import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductActions from "./ProductActions";

import type { Product } from "../types";

type ProductTableProps = {
  products: Product[];
  onManageVariants: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function ProductTable({
  products,
  onManageVariants,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>

              <TableCell className="text-muted-foreground">
                /{product.slug}
              </TableCell>

              <TableCell>{product.active ? "Active" : "Inactive"}</TableCell>

              <TableCell className="text-right flex gap-2">
                <ProductActions
                  product={product}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onManageVariants={onManageVariants}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;
