import Navbar from "../../components/NavBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink,useParams, useHistory } from "react-router-dom";
import useStyles from "./style";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import SnackbarAlert from "../../components/SnackbarAlert";


export default function EditarProduto() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { token, usuario } = useAuth();
  const [erro, setErro] = useState('');
  const [openLoading, setOpenLoading] = useState(false);
  const [dadosProduto, setDadosProduto] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    getProduct()
  }, []);

  async function getProduct () {
    setErro('');
    
    try{
      setOpenLoading(true);
      const resposta = await fetch(`http://localhost:8000/produtos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const dados = await resposta.json();
      setOpenLoading(false);

      if(!resposta.ok) {
        return setErro(dados);
      }
      setDadosProduto(dados)

    } catch(error) {
      setOpenLoading(false);
      return setErro(error.message)
    }
  }

  async function onSubmit(data) {
    setErro('');
    
    try{
      setOpenLoading(true);
      const resposta = await fetch(`http://localhost:8000/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }
      });

      const resultado = await resposta.json();
      setOpenLoading(false);

      if(!resposta.ok) {
        return setErro(resultado);
      }

      history.push('/produtos');

    }catch(error) {
      setOpenLoading(false);
      return setErro(error.message)
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
          Editar produto
        </Typography>
        <div className={classes.containerEditar}>
          <div className={classes.editarProduto}>
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
                label="Pre??o"
                {...register("preco")}
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0
                  },
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
                  inputProps: {
                    min: 0
                  },
                  startAdornment: (
                    <InputAdornment position="start">Un</InputAdornment>
                  ),
                }}
              />
            </div>
            <TextField
              className={classes.input}
              id="descricao"
              label="Descri????o do produto"
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
          <CardMedia
            className={classes.imagem}
            component='img'
            image={dadosProduto.imagem}
            title={dadosProduto.descricao}
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
            SALVAR ALTERA????ES
          </Button>
        </div>
      </form>
      <Loading open={openLoading} />
      <SnackbarAlert erro={erro}/>
    </div>
  );
}
