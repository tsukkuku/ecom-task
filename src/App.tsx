import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "./types/types";
import { MOCK_DATA } from "./mock/mock";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Input } from "./components/input/Input";
import style from "./App.module.css";
import { useDebounce } from "./hooks/useDebounce";
import { useModal } from "./hooks/useModal";
import { Modal } from "./components/modal/Modal";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product | null>(
    null,
  );
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value);
  const { isOpen, handleOpen } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearProduct = (product: Product) => {
    handleOpen();
    setSelectedProducts(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProducts(MOCK_DATA);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("Неизвестная ошибка", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title
      .trim()
      .toLowerCase()
      .includes(debouncedValue.trim().toLowerCase()),
  );

  return (
    <div className={style.mainPage}>
      <h1 className={style.pageTitle}>Ecom.tech. тестовое задание</h1>
      <div className={style.searchInput}>
        <Input
          placeholder="Введите название товара..."
          value={value}
          onChange={handleChange}
        />
      </div>
      {loading ? (
        <div className={style.loadingMsg}>Загрузка...</div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className={style.productList}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  setSelectedProduct={clearProduct}
                />
              ))}
            </div>
          ) : (
            <div className={style.notFoundMsg}>Ничего не найдено</div>
          )}
        </>
      )}

      <Modal isOpen={isOpen} onClose={handleOpen} product={selectedProducts} />
    </div>
  );
}

export default App;
