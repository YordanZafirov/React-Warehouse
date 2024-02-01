import { forwardRef, useRef, useImperativeHandle } from "react";
import Cart from "./Cart";
import { CloseModalButton, Modal } from "./Cart.style";

export interface ModalInstance {
  open: () => void;
  close: () => void;
}

const CartModal = forwardRef<ModalInstance>((props, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
      close: () => {
        if (dialog.current) {
          dialog.current.close();
        }
      },
    }),
    []
  );

  return (
    <div>
      <Modal id="modal" ref={dialog}>
        <CloseModalButton
          className="close"
          onClick={() => dialog.current?.close()}
        >
          X
        </CloseModalButton>
        <Cart />
      </Modal>
    </div>
  );
});

export default CartModal;
