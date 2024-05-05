import React, { useEffect } from "react";

const Alert = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [props]);

  return (
    <div className="alert alert-danger" role="alert">
      {props.message}
    </div>
  );
};

export default Alert;