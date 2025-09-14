import classnames from "classnames";
import { useMemo } from "react";
const SelectOptionComponent = ({ type, category, values, ...rest }) => {
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
          {values !== undefined &&
            values.map((val, idx) => (
              <option key={idx} value={val.role_id}>
                {val.role_name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default SelectOptionComponent;
