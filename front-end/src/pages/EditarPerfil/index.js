import Navbar from "../../components/NavBar";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import useStyles from "./style";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

export default function EditarPerfil() {
  const { setSelecionado } = useAuth();
  const { register, handleSubmit } = useForm();
  const [visivel, setVisivel] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setSelecionado("perfil");
  }, []);

  const handleClickShowPassword = () => {
    setVisivel(!visivel);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className={classes.body}>
      <Navbar />
      <form className={classes.perfil} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h2" className={classes.titulo}>
          Nome da loja
        </Typography>
        <Typography variant="h4" component="h2" className={classes.subtitulo}>
          Editar Perfil
        </Typography>
        <div className={classes.inputsPerfil}>
          <TextField
            className={classes.input}
            id="nome"
            label="Seu nome"
            {...register("nome")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            id="nome-loja"
            label="Nome da loja"
            {...register("nome_loja")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className={classes.input}>
            <InputLabel shrink={true} htmlFor="senha">
              Senha
            </InputLabel>
            <Input
              id="senha"
              {...register("senha")}
              type={visivel ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {visivel ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            className={classes.input}
            id="email"
            {...register("email")}
            label="E-mail"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className={classes.input}>
            <InputLabel shrink={true} htmlFor="nova-senha">
              Nova senha
            </InputLabel>
            <Input
              id="nova-senha"
              {...register("novaSenha")}
              type={visivel ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {visivel ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel shrink={true} htmlFor="Repita-senha">
              Repita a nova senha
            </InputLabel>
            <Input
              id="Repita-senha"
              {...register("novaSenhaRepetida")}
              type={visivel ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {visivel ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Divider />
        <div className={classes.botoes}>
          <NavLink className={classes.cor} to="/perfil">
            CANCELAR
          </NavLink>
          <Button
            type="submit"
            className={classes.background}
            variant="contained"
            color="primary"
          >
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </form>
    </div>
  );
}
