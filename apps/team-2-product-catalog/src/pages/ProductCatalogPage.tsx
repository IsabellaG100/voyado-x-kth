import { Badge, Card } from '@voyado-kth/ui';
import styles from './ProductCatalogPage.module.css';

const controlPreview = ['Category filters', 'Search field', 'Sort menu'];

const catalogPreview = [
  'Wishlist-aware product cards',
  'Responsive product grid',
  'Empty state and detail dialog hooks',
];

export function ProductCatalogPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="catalog-planning-title">
        <div className={styles.heroCopy}>
          <Badge variant="info">Story S1.1</Badge>
          <h2 id="catalog-planning-title" className={styles.heroTitle}>
            A polished storefront is taking shape.
          </h2>
          <p className={styles.heroDescription}>
            This scaffold sets up the Product Catalog with dedicated control and
            results regions so the next stories can layer in filtering, search,
            sorting, wishlist actions, and product details without reworking the
            page structure.
          </p>
        </div>

        <div className={styles.heroMetrics} aria-label="Planned catalog sections">
          <div className={styles.metric}>
            <span className={styles.metricValue}>3</span>
            <span className={styles.metricLabel}>control zones</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>1</span>
            <span className={styles.metricLabel}>catalog canvas</span>
          </div>
        </div>
      </section>

      <section className={styles.layout} aria-label="Catalog page scaffold">
        <Card className={styles.surface}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Controls region</p>
              <h3 className={styles.sectionTitle}>Quick-find toolbar</h3>
            </div>
            <span className={styles.sectionNote}>Ready for S2.2-S3.1</span>
          </div>

          <div className={styles.placeholderRow}>
            {controlPreview.map(item => (
              <div key={item} className={styles.placeholderPill}>
                {item}
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.surface}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Results region</p>
              <h3 className={styles.sectionTitle}>Catalog canvas</h3>
            </div>
            <span className={styles.sectionNote}>Ready for S2.1-S4.2</span>
          </div>

          <div className={styles.canvas}>
            <div className={styles.canvasGlow} aria-hidden="true" />
            <div className={styles.canvasContent}>
              <div className={styles.canvasLead}>
                Product cards, empty states, and the detail dialog will anchor
                here as the catalog becomes interactive.
              </div>

              <div className={styles.previewGrid}>
                {catalogPreview.map(item => (
                  <div key={item} className={styles.previewTile}>
                    <span className={styles.previewLabel}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
