import { useState } from 'react';
import type { Product, ProductCategory } from '@voyado-kth/shared';
import { Badge, Card } from '@voyado-kth/ui';
import categoriesData from '../../data/categories.json';
import productsData from '../../data/products.json';
import styles from './ProductCatalogPage.module.css';

type SortOptionId = 'name-asc' | 'price-asc' | 'price-desc' | 'rating-desc';

const categories = categoriesData as ProductCategory[];
const products = productsData as Product[];
const controlPreview = ['Category filters', 'Search field', 'Sort menu'];
const sortLabels: Record<SortOptionId, string> = {
  'name-asc': 'Name A-Z',
  'price-asc': 'Price low-high',
  'price-desc': 'Price high-low',
  'rating-desc': 'Rating highest',
};

export function ProductCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOptionId>('name-asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const matchingProducts = products.filter(product => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesSearch =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  const visibleProducts = [...matchingProducts].sort((left, right) => {
    switch (sortOption) {
      case 'price-asc':
        return left.price - right.price;
      case 'price-desc':
        return right.price - left.price;
      case 'rating-desc':
        return right.rating - left.rating;
      case 'name-asc':
      default:
        return left.name.localeCompare(right.name);
    }
  });

  const categorySummary = [
    { id: 'all', name: 'All products', productCount: products.length },
    ...categories,
  ];

  const statePreview = [
    {
      label: 'Active category',
      value:
        activeCategory === 'all'
          ? 'All products'
          : (categories.find(category => category.id === activeCategory)?.name ??
            activeCategory),
    },
    {
      label: 'Search query',
      value: searchQuery || 'No query set',
    },
    {
      label: 'Sort preset',
      value: sortLabels[sortOption],
    },
    {
      label: 'Selected product',
      value: selectedProduct?.name ?? 'No product selected',
    },
    {
      label: 'Wishlist state',
      value:
        wishlistIds.length > 0
          ? `${wishlistIds.length} saved`
          : 'No saved products yet',
    },
  ];

  const catalogPreview = [
    `${visibleProducts.length} visible products`,
    `${categorySummary.length} category options ready`,
    `${products.filter(product => !product.inStock).length} out-of-stock states loaded`,
  ];

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
            <span className={styles.metricValue}>{products.length}</span>
            <span className={styles.metricLabel}>typed products loaded</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{categories.length}</span>
            <span className={styles.metricLabel}>typed categories loaded</span>
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

          <div className={styles.stateList} aria-label="Catalog state preview">
            {statePreview.map(item => (
              <div key={item.label} className={styles.stateItem}>
                <span className={styles.stateLabel}>{item.label}</span>
                <strong className={styles.stateValue}>{item.value}</strong>
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

              <div className={styles.dataFootnote}>
                Baseline state is ready for
                {' '}
                {categorySummary[0].name.toLowerCase()}
                , derived filtering, sorting, selection, and wishlist flows.
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
