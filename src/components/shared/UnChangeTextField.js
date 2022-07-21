import PropTypes from "prop-types";

const UnChangeTextField = ({
  label,
  type = "text",
  inputChange = () => {},
  error,
  value,
  ...rest
}) => {
  return (
    <label className={`text-field ${error ? "error" : ""}`}>
      {label && <span>{label}</span>}
      <div>{value}</div>
    </label>
  );
};

UnChangeTextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
};

export default UnChangeTextField;
