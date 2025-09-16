import classnames from "classnames";
import { useMemo, memo } from "react";
const SelectOptionComponent = ({ type, category, children, ...rest }) => {
  const selectClass = useMemo(() => {
    return type && `select-option-group-${type}`;
  }, [type]);

  const combinedClass = useMemo(() => {
    return classnames("select-option-group", selectClass);
  }, [selectClass]);
  return (
    <div className="select-option-component">
      {category && <label className="select-label">{category}</label>}
      <div className={combinedClass}>
        <select className="select-option" {...rest}>
          <option value="">Select an option</option>
          {children}
        </select>
      </div>
    </div>
  );
};

export default memo(SelectOptionComponent);
