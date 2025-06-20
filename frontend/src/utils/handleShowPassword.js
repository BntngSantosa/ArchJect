import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function handleShowPassword() {
  const [type, setType] = useState("Password");
  const [icon, setIcon] = useState(faEye);

  const toggle = () => {
    if (type === "Password") {
      setType("text");
      setIcon(faEyeSlash);
    } else {
      setType("Password");
      setIcon(faEye);
    }
  };

  return { type, icon, toggle };
}
