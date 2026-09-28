import { useCallback, useState } from 'react';
import { Brands } from './components/Brands/Brands';
import { Categories } from './components/Categories/Categories';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Newsletter } from './components/Newsletter/Newsletter';
import { Partners } from './components/Partners/Partners';
import { ProductModal } from './components/ProductModal/ProductModal';
import { Showcase } from './components/Showcase/Showcase';
import { TopBar } from './components/TopBar/TopBar';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';

function App() {
  const { products, status, error, retry } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Categories />
        <Showcase
          id="vitrine"
          title="Produtos relacionados"
          products={products}
          status={status}
          error={error}
          onRetry={retry}
          showTabs
          onSelectProduct={handleSelectProduct}
        />
        <Partners />
        <Showcase
          id="vitrine-2"
          title="Produtos relacionados"
          products={products}
          status={status}
          error={error}
          onRetry={retry}
          onSelectProduct={handleSelectProduct}
        />
        <Partners />
        <Brands />
        <Showcase
          id="vitrine-3"
          title="Produtos relacionados"
          products={products}
          status={status}
          error={error}
          onRetry={retry}
          onSelectProduct={handleSelectProduct}
        />
      </main>
      <Newsletter />
      <Footer />
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
}

export default App;
