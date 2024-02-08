import { forwardRef, useRef, useImperativeHandle } from "react";
import Cart from "./Cart";
import { CloseModalButton, Modal } from "./Cart.style";

export interface ModalInstance {
  open: () => void;
  close: () => void;
}

const CartModal = forwardRef<ModalInstance>((props, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    if (dialog.current) {
      dialog.current.close();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
      close: handleClose,
    }),
    []
  );

  return (
    <div>
      <Modal id="modal" ref={dialog}>
        <CloseModalButton className="close" onClick={handleClose}>
          X
        </CloseModalButton>
        <Cart onSubmit={handleClose} />
      </Modal>
    </div>
  );
});

export default CartModal;
