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

export default function Navbar(props) {
  const classes = useStyles();
  const { setToken, setUsuario } = useAuth();
  const history = useHistory();

  function irParaLoja() {
    history.push("/produtos");
  }

  function irParaPerfil() {
    history.push("/perfil");
  }

  function deslogar () {
    setToken('');
    setUsuario({});
  }

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar className={classes.nav}>
        {props.selecionado === "storeSelected" && (
          <StoreSelected className={classes.cursor} />
        )}
        {props.selecionado !== "storeSelected" && (
          <Store className={classes.cursor} onClick={irParaLoja} />
        )}
        {props.selecionado === "perfil" && (
          <UserSelected className={classes.cursor} />
        )}
        {props.selecionado !== "perfil" && (
          <User className={classes.cursor} onClick={irParaPerfil} />
        )}
        <Close className={classes.close} onClick={deslogar}/>
      </Toolbar>
    </AppBar>
  );
}
