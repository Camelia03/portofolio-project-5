import React from "react";
import styles from "../styles/AppButton.module.css";

const AppButton = ({
  as: Element = "button",
  children,
  variant = "primary",
  className,
  ...props
}) => {
  let variantClassName;
  switch (variant) {
    case "primary":
      variantClassName = styles.Primary;
      break;
    case "secondary":
      variantClassName = styles.Secondary;
      break;
    case "clear":
      variantClassName = styles.Clear;
      break;
    default:
      break;
  }

  return (
    <Element
      {...props}
      className={`${styles.Button} ${variantClassName} ${
        className ? className : ""
      }`}
    >
      {children}
    </Element>
  );
};

export default AppButton;
