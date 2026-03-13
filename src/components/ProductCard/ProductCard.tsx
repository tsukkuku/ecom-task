import type { Product } from "../../types/types";
import style from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  setSelectedProduct: (product: Product) => void;
}

export const ProductCard = ({
  product,
  setSelectedProduct,
}: ProductCardProps) => {
  return (
    <div
      className={style.productCard}
      onClick={() => setSelectedProduct(product)}
    >
      <div className={style.productImage}>
        <img src={product.image} alt={product.title} className={style.image} />
      </div>
      <div className={style.productCardHeader}>
        <div className={style.productTitle}>{product.title}</div>
        <div className={style.productCategory}>{product.category}</div>
      </div>
      <div className={style.productDescription}>{product.description}</div>
      <div className={style.productPrice}>
        {product.price.toLocaleString()}₽
      </div>
      <button className={style.checkProductBtn}>Просмотреть</button>
    </div>
  );
};
