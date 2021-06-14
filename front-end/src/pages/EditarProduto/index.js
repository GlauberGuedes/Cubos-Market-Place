import Navbar from "../../components/NavBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink } from "react-router-dom";
import useStyles from "./style";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

export default function EditarProduto() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { setSelecionado } = useAuth();

  useEffect(() => {
    setSelecionado("storeSelected");
  }, []);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className={classes.body}>
      <Navbar />
      <form className={classes.produtos} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h2" className={classes.titulo}>
          Nome da loja
        </Typography>
        <Typography variant="h4" component="h2" className={classes.subtitulo}>
          Editar produto
        </Typography>
        <div className={classes.containerEditar}>
          <div className={classes.editarProduto}>
            <TextField
              className={classes.input}
              defaultValue="Nome do produto"
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
                defaultValue="99.99"
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
                defaultValue="5"
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
              defaultValue="Camisa preta"
              id="descricao"
              label="Descrição do produto"
              {...register("descricao")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.input}
              defaultValue="Nome"
              id="categoria"
              label="Categoria"
              {...register("categoria")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.input}
              defaultValue="http..."
              id="imagem"
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
    </div>
  );
}
