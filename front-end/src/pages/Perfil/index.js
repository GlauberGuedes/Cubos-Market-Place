import Navbar from "../../components/NavBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import useStyles from "./style";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import SnackbarAlert from "../../components/SnackbarAlert";

export default function Perfil() {
  const { usuario, token, setUsuario } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setErro("");
    setOpenLoading(true);
    try {
      const resposta = await fetch("http://localhost:8000/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await resposta.json();
      setOpenLoading(false);

      setUsuario(dados);
    } catch (error) {
      setOpenLoading(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.body}>
      <Navbar selecionado="perfil" />
      <div className={classes.perfil}>
        <Typography variant="h3" component="h2" className={classes.titulo}>
          {usuario.nome_loja}
        </Typography>
        <Typography variant="h4" component="h2" className={classes.subtitulo}>
          Perfil
        </Typography>
        <div className={classes.inputsPerfil}>
          <TextField
            className={classes.input}
            disabled
            id="nome"
            label="Seu nome"
            value={usuario.nome}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            disabled
            id="nome-loja"
            label="Nome da loja"
            value={usuario.nome_loja}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            disabled
            id="email"
            label="E-mail"
            value={usuario.email}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Divider />
        <Button
          onClick={() => history.push("/perfil/editar")}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          EDITAR PERFIL
        </Button>
      </div>
      <Loading open={openLoading} />
      <SnackbarAlert erro={erro} />
    </div>
  );
}
