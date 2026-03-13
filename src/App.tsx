import { useEffect, useState } from "react";
import type { Product } from "./types/types";
import { MOCK_DATA } from "./mock/mock";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Input } from "./components/input/Input";
import style from "./App.module.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(MOCK_DATA);
  }, []);

  return (
    <div className={style.mainPage}>
      <h1 className={style.pageTitle}>Ecom.tech. тестовое задание</h1>
      <div className={style.searchInput}>
        <Input placeholder="Введите название товара..." />
      </div>
      <div className={style.productList}>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
