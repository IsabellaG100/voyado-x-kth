import type { Product } from '@voyado-kth/shared';
import { Button, Dialog } from '@voyado-kth/ui';
import styles from './ProductDetailDialog.module.css';

export interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailDialog({
  product,
  open,
  onClose,
}: ProductDetailDialogProps) {
  if (!product) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={product.name}
      actions={
        <Button variant="neutral" onClick={onClose}>
          Back to catalog
        </Button>
      }
    >
      <div className={styles.content}>
        <div className={styles.mediaWrap}>
          <img
            className={styles.media}
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className={styles.summary}>
          <p className={styles.description}>{product.description}</p>
          <dl className={styles.metaList}>
            <div className={styles.metaItem}>
              <dt className={styles.label}>Category</dt>
              <dd className={styles.value}>{product.category}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt className={styles.label}>Sort context</dt>
              <dd className={styles.value}>Grid state is preserved when closing</dd>
            </div>
          </dl>
        </div>
      </div>
    </Dialog>
  );
}
