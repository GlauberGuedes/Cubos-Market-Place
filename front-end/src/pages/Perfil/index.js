import Navbar from "../../components/NavBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import useStyles from "./style";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

export default function Perfil() {
  const { setSelecionado } = useAuth();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setSelecionado("perfil");
  }, []);

  return (
    <div className={classes.body}>
      <Navbar />
      <div className={classes.perfil}>
        <Typography variant="h3" component="h2" className={classes.titulo}>
          Nome da loja
        </Typography>
        <Typography variant="h4" component="h2" className={classes.subtitulo}>
          Perfil
        </Typography>
        <div className={classes.inputsPerfil}>
          <TextField
            className={classes.input}
            id="nome"
            label="Seu nome"
            defaultValue="Glauber"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            id="nome-loja"
            label="Nome da loja"
            defaultValue="Outlet GG"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            id="email"
            label="E-mail"
            defaultValue="glauber@cubos.io"
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
    </div>
  );
}
