import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [value, setValue] = useLocalStorage('TOKEN', '');
  const [tokenUsuarioValue, setTokenUsuarioValue] = useLocalStorage('TOKEN-USUARIO', '');
  const [valueUsuario, setValueUsuario] = useLocalStorage('USUARIO', {});
  const [token, setToken] = useState(value);
  const [tokenUsuario, setTokenUsuario] = useState(value);
  const [usuario, setUsuario] = useState(valueUsuario);

  useEffect(() => {
    setValue(token);
    setValueUsuario(usuario);
    setTokenUsuarioValue(tokenUsuario)
  }, [token, usuario]);

  return {
    token,
    setToken,
    usuario,
    setUsuario,
    setTokenUsuario,
    tokenUsuario
  };
}
