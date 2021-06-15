import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [value, setValue] = useLocalStorage('TOKEN', '');
  const [valueUsuario, setValueUsuario] = useLocalStorage('USUARIO', {});
  const [token, setToken] = useState(value);
  const [usuario, setUsuario] = useState(valueUsuario);

  useEffect(() => {
    setValue(token);
    setValueUsuario(usuario);
  }, [token, usuario]);

  return {
    token,
    setToken,
    usuario,
    setUsuario
  };
}
