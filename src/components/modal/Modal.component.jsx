import { useCallback, memo, useMemo, useEffect } from "react";
import { CloseIcon } from "../../helpers/Icon.helper";
import classnames from "classnames";
const ModalComponent = ({
  isModalOpen,
  setIsModalOpen,
  modalFor,
  title,
  size,
  children,
}) => {
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const joinClassName = useMemo(() => {
    const activeClass = isModalOpen ? "active" : "";
    const modalClass = modalFor ? `modal-container-${modalFor}` : "";
    return classnames("modal-container", activeClass, modalClass);
  }, [isModalOpen, modalFor]);

  const joinClassMain = useMemo(() => {
    return classnames(
      "modal-main-content",
      size ? `modal-main-content-${size}` : ""
    );
  }, [size]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className={joinClassName}>
      <div className="overlayout"></div>
      <div className={joinClassMain}>
        <div className="modal-header">
          <div className="modal-header-title">{title}</div>
          <div className="close-modal" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="modal-des">{children}</div>
      </div>
    </div>
  );
};

export default memo(ModalComponent);
