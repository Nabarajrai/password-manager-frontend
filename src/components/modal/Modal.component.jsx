import { useCallback, memo, useMemo } from "react";
import { CloseIcon } from "../../helpers/Icon.helper";
import classnames from "classnames";
const ModalComponent = ({ isModalOpen, setIsModalOpen, title, children }) => {
  const handleClose = useCallback(() => {
    console.log("close");
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const joinClassName = useMemo(() => {
    const activeClass = isModalOpen ? "active" : "";
    return classnames("modal-container", activeClass);
  }, [isModalOpen]);

  return (
    <div className={joinClassName}>
      <div className="overlayout"></div>
      <div className="modal-main-content">
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
