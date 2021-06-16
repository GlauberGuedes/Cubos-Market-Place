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

function Routes() {
  
  function RotasProtegidas(props) {
    const { token } = useAuth();
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
  }

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <RotasProtegidas>
            <Route path="/produtos" exact component={Produtos} />
            <Route path="/produtos/novo" component={CriarProduto} />
            <Route path="/produtos/:id/editar" component={EditarProduto} />
            <Route path="/perfil" exact component={Perfil} />
            <Route path="/perfil/editar" component={EditarPerfil} />
            <Route path="/usuario" component={Usuario} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default Routes;
