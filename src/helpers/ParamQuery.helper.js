import { useLocation } from "react-router-dom";

export const ParamQuery = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());
  return params;
};
