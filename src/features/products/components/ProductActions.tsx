import { Button } from "@/components/ui/button";
import type { Product } from "../types";

type ProductActionsProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onManageVariants: (product: Product) => void;
};

function ProductActions({
  product,
  onEdit,
  onDelete,
  onManageVariants,
}: ProductActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
        Edit
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onManageVariants(product)}
      >
        Manage variants
      </Button>

      <Button variant="outline" size="sm" onClick={() => onDelete(product)}>
        Delete
      </Button>
    </div>
  );
}

export default ProductActions;
