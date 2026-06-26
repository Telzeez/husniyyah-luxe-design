'use client';

import { useTransition } from 'react';
import { deleteProduct } from '../../../src/actions/product';

export function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this product?')) {
          startTransition(async () => {
            await deleteProduct(id);
          });
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 transition-colors font-medium disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
