import "./Routes.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Produtos from "./pages/Produtos";
import CriarProduto from "./pages/CriarProduto";
import EditarProduto from "./pages/EditarProduto";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import Usuario from "./pages/Usuario";
import useAuth from "./hooks/useAuth";
import LoginUsuario from "./pages/Login-Usuario";
import CadastroUsuario from "./pages/Cadastro-Usuario";

function Routes() {
  function RotasProtegidas(props) {
    const { token } = useAuth();
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
  }

  function RotasProtegidasUsuario(props) {
    const { tokenUsuario } = useAuth();
    return (
      <Route
        render={() =>
          tokenUsuario ? props.children : <Redirect to="/login" />
        }
      />
    );
  }

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/login" component={LoginUsuario} />
          <Route path="/cadastro-usuario" component={CadastroUsuario} />
          <Route path="/" exact component={Login} />
          <Route path="/usuario" component={Usuario} />
          <RotasProtegidas>
            <Route path="/produtos" exact component={Produtos} />
            <Route path="/produtos/novo" component={CriarProduto} />
            <Route path="/produtos/:id/editar" component={EditarProduto} />
            <Route path="/perfil" exact component={Perfil} />
            <Route path="/perfil/editar" component={EditarPerfil} />
          </RotasProtegidas>       
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default Routes;
