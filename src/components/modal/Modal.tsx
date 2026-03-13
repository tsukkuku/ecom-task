import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Product } from "../../types/types";
import style from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const Modal = ({ product, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return createPortal(
    <div
      className={`${style.modal} ${isOpen ? style.active : ""}`}
      onClick={onClose}
    >
      {isOpen && (
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.modalHeader}>
            <div className={style.modalTitle}>{product?.title}</div>
            <button onClick={onClose} className={style.closeButton}>
              ×
            </button>
          </div>
          <div className={style.modalBody}>
            <div className={style.imgContainer}>
              <img
                src={product?.image}
                alt={product?.title}
                className={style.img}
              />
            </div>
            <div className={style.productInfo}>
              <div className={style.title}>{product?.title}</div>
              <div className={style.description}>{product?.description}</div>
              <div className={style.price}>
                Цена: {product?.price.toLocaleString()}₽
              </div>
              <button className={style.buyBtn}>Купить</button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
};
