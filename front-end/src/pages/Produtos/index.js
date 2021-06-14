import Navbar from "../../components/NavBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import useStyles from "./style";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ModalDelete from "../../components/ModalDelete";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Produtos() {
  const classes = useStyles();
  const history = useHistory();
  const { setSelecionado, token } = useAuth();
  const [erro, setErro] = useState("");
  const [openLoading, setOpenLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    setSelecionado("storeSelected");
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    setErro("");
    setOpenLoading(true);
    try {
      const resposta = await fetch("http://localhost:8000/produtos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resposta.json();
      setOpenLoading(false);

      setProdutos(data);
    } catch (error) {
      setOpenLoading(false);
      return setErro(error.message);
    }
  }

  return (
    <div className={classes.body}>
      <Navbar />
      <div className={classes.produtos}>
        <Typography variant="h3" component="h2" className={classes.titulo}>
          Nome da loja
        </Typography>
        <Typography variant="h4" component="h2" className={classes.subtitulo}>
          Seus produtos
        </Typography>
        <div className={classes.listaCards}>
          {produtos.map((produto) => {
            return (
              <Card
                className={classes.card}
                key={produto.id}
                onClick={() => history.push(`/produtos/${produto.id}/editar`)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.imagem}
                    image={produto.imagem}
                    title={produto.descricao}
                  >
                    <ModalDelete
                      id={produto.id}
                      carregarProdutos={carregarProdutos}
                      setOpenLoading={setOpenLoading}
                      setErro={setErro}
                      token={token}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {produto.nome}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {produto.descricao}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Typography
                    gutterBottom
                    color="textSecondary"
                    variant="body2"
                    component="p"
                  >
                    {produto.estoque}{" "}
                    {produtos.estoque > 1 ? "unidades" : "unidade"}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="p">
                    R$ {produto.preco}
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <Divider />
        <Button
          onClick={() => history.push(`/produtos/novo`)}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          ADICIONAR PRODUTO
        </Button>
      </div>
      <Loading open={openLoading} />
      <Snackbar open={erro ? true : false} autoHideDuration={6000} >
        <Alert severity="error">
          {erro}
        </Alert>
      </Snackbar>
    </div>
  );
}
