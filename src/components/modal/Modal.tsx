import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Product } from "../../types/types";
import style from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
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
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <div className={style.modalTitle}>{product.price}</div>
          <button onClick={onClose} className={style.closeButton}>
            ×
          </button>
        </div>
        <div className={style.modalBody}>{product.title}</div>
      </div>
    </div>,
    document.body,
  );
};
