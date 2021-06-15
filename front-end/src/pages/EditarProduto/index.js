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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function EditarProduto() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { setSelecionado, token, usuario } = useAuth();
  const [erro, setErro] = useState('');
  const [openLoading, setOpenLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    setSelecionado("storeSelected");
  }, []);

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
        console.log(resultado)
        return setErro(resultado);
      }

      history.push('/produtos');

    }catch(error) {
      console.log(error.message)
      setOpenLoading(false);
      return setErro(error.message)
    }
  }

  return (
    <div className={classes.body}>
      <Navbar />
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
                label="Preço"
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
          <CardMedia
            className={classes.imagem}
            image="https://bit.ly/3ctikxq"
            title="Camisa de malha com acabamento fino."
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
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </form>
      <Loading open={openLoading} />
      <Snackbar open={erro ? true : false} autoHideDuration={6000} >
        <Alert severity="error">
          {erro}
        </Alert>
      </Snackbar>
    </div>
  );
}
