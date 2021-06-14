import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import useStyles from "./style";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import { validarCadastro } from '../../utils/validacao';

export default function Cadastro() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [visivel, setVisivel] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleClickShowPassword = () => {
    setVisivel(!visivel);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit(data) {
    setErro('');
    const cadastroValidado = validarCadastro(data);
    
    if(cadastroValidado) {
      return setErro(cadastroValidado);
    }
    
    setOpenLoading(true);

    const dados = {
      nome: data.nome,
      nome_loja: data.nome_loja,
      email: data.email,
      senha: data.senha
    }
    try{
      const resposta = await fetch('http://localhost:8000/cadastro', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
          'Content-type': 'application/json'
        }
      });

      const resultado = await resposta.json();
      
      setOpenLoading(false);
      if(!resposta.ok) {
        return setErro(resultado);
      }

      history.push('/');
    }catch(error) {
      setOpenLoading(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.login}>
      <Loading open={openLoading} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h2" className={classes.titulo}>
          Criar uma conta
        </Typography>
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
        <TextField
          className={classes.input}
          id="email"
          label="E-mail"
          {...register("email")}
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
        <FormControl className={classes.input}>
          <InputLabel shrink={true} htmlFor="senha-repetida">
            Repita a senha
          </InputLabel>
          <Input
            id="senha-repetida"
            {...register("senhaRepetida")}
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
        {erro && <Alert severity="error">{erro}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          CRIAR CONTA
        </Button>
        <Typography variant="body2" component="p">
          Já possui uma conta? <NavLink to="/">ACESSE</NavLink>
        </Typography>
      </form>
      <Loading open={openLoading}/>
    </div>
  );
}
