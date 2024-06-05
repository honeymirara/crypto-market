'use client'
import React, { FC } from 'react';
import style from './style.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  coinName: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onConfirm, coinName }) => {
  const [quantity, setQuantity] = React.useState<number>(0);

  const handleConfirm = () => {
    if (quantity > 0) {
      onConfirm(quantity);
      setQuantity(0);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Add {coinName}</h2>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          max={100} 
        />
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;

