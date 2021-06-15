import Navbar from "../../components/NavBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { NavLink, useHistory } from "react-router-dom";
import useStyles from "./style";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { validarProduto } from "../../utils/validacao";
import Loading from "../../components/Loading";
import SnackbarAlert from "../../components/SnackbarAlert";

export default function CriarProduto() {
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const { token, usuario } = useAuth();
  const [erro, setErro] = useState('');
  const [openLoading, setOpenLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  async function onSubmit(data) {
    setErro('');
    const verificarProduto = validarProduto(data.nome, data.preco, data.estoque, data.descricao);

    if(verificarProduto) {
      return setErro(verificarProduto);
    }

    try{
      const resposta = await fetch('http://localhost:8000/produtos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }
      });

      const dados = await resposta.json();
      setOpenLoading(false);

      if(!resposta.ok) {
        return setErro(dados);
      }

      history.push('/produtos');

    }catch(error) {
      setOpenLoading(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.body}>
      <Navbar selecionado="storeSelected"/>
      <form className={classes.produtos} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h2" className={classes.titulo}>
          {usuario.nome_loja}
        </Typography>
        <Typography variant="h4" component="h2" className={classes.subtitulo}>
          Adicionar produto
        </Typography>
        <div className={classes.adicionarProduto}>
          <TextField
            className={classes.input}
            id="nome"
            label="Nome do produto"
            {...register("nome")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={(classes.input, classes.listaInputs)}>
            <TextField
              className={classes.inputNumber}
              id="preco"
              label="Preço"
              {...register("preco")}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.inputNumber}
              id="estoque"
              label="Estoque"
              {...register("estoque")}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Un</InputAdornment>
                ),
              }}
            />
          </div>
          <TextField
            className={classes.input}
            id="descricao"
            label="Descrição do produto"
            {...register("descricao")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.input}
            id="imagem"
            type="url"
            label="Imagem"
            {...register("imagem")}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Divider />
        <div className={classes.botoes}>
          <NavLink className={classes.cor} to="/produtos">
            CANCELAR
          </NavLink>
          <Button
            type="submit"
            className={classes.background}
            variant="contained"
            color="primary"
          >
            ADICIONAR PRODUTO
          </Button>
        </div>
      </form>
      <Loading open={openLoading} />
      <SnackbarAlert erro={erro}/>
    </div>
  );
}
