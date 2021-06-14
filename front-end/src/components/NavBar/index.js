import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "./style";
import { ReactComponent as StoreSelected } from "../../assets/store-selected.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as Store } from "../../assets/store.svg";
import { ReactComponent as UserSelected } from "../../assets/user-selected.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const classes = useStyles();
  const { selecionado, setSelecionado, setToken } = useAuth();
  const history = useHistory();

  function irParaLoja() {
    setSelecionado("storeSelected");
    history.push("/produtos");
  }

  function irParaPerfil() {
    setSelecionado("perfil");
    history.push("/perfil");
  }

  function deslogar () {
    setToken('');
  }

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar className={classes.nav}>
        {selecionado === "storeSelected" && (
          <StoreSelected className={classes.cursor} />
        )}
        {selecionado !== "storeSelected" && (
          <Store className={classes.cursor} onClick={irParaLoja} />
        )}
        {selecionado === "perfil" && (
          <UserSelected className={classes.cursor} />
        )}
        {selecionado !== "perfil" && (
          <User className={classes.cursor} onClick={irParaPerfil} />
        )}
        <Close className={classes.close} onClick={deslogar}/>
      </Toolbar>
    </AppBar>
  );
}
