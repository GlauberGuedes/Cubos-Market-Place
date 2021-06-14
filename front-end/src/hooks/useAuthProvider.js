import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [selecionado, setSelecionado] = useState("storeSelected");
  const [value, setValue] = useLocalStorage('TOKEN', '');
  const [token, setToken] = useState(value);

  useEffect(() => {
    setValue(token);
  }, [token]);

  return {
    selecionado,
    setSelecionado,
    token,
    setToken
  };
}
