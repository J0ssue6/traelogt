import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { ProductVariant } from "../types";

type ProductVariantTableProps = {
  variants: ProductVariant[];
  onDelete: (variant: ProductVariant) => void;
  onEdit: (variant: ProductVariant) => void;
};

function ProductVariantTable({
  variants,
  onDelete,
  onEdit,
}: ProductVariantTableProps) {
  const [variantToDelete, setVariantToDelete] = useState<ProductVariant | null>(
    null,
  );

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Variant</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell className="font-medium">{variant.name}</TableCell>

              <TableCell className="text-muted-foreground">
                {variant.sku ?? "—"}
              </TableCell>

              <TableCell>Q{variant.price}</TableCell>

              <TableCell>{variant.stock}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(variant)}
                >
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setVariantToDelete(variant)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog
        open={Boolean(variantToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setVariantToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="max-h-[90vh] overflow-y-auto bg-background sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete variant?</AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete "{variantToDelete?.name}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (variantToDelete) {
                  onDelete(variantToDelete);
                }

                setVariantToDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProductVariantTable;
