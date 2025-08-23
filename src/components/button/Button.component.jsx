import { useMemo } from "react";
import classnames from "classnames";
const ButtonComponent = ({
  children,
  size = "lg",
  varient = "primary",
  ...rest
}) => {
  const sizeClassName = useMemo(() => {
    return size && `btn-group__${size}`;
  }, [size]);
  const varientClassName = useMemo(() => {
    return varient && `btn-group__${varient}`;
  }, [varient]);
  const combinedClassName = useMemo(() => {
    return classnames("btn-group", varientClassName, sizeClassName);
  }, [sizeClassName, varientClassName]);
  return (
    <div className={combinedClassName}>
      <button className="btn" {...rest}>
        {children}
      </button>
    </div>
  );
};

export default ButtonComponent;
