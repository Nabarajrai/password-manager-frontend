import { useMemo, memo } from "react";
import classnames from "classnames";
const ButtonComponent = ({
  children,
  size = "lg",
  varient = "primary",
  style,
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

  const varientStyles = useMemo(() => {
    return style && ` btn-${style}`;
  }, [style]);
  const combinedStyle = useMemo(() => {
    return classnames("btn", varientStyles);
  }, [varientStyles]);
  return (
    <div className={combinedClassName}>
      <button className={combinedStyle} {...rest}>
        {children}
      </button>
    </div>
  );
};

export default memo(ButtonComponent);
