import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import useStyles from "./style";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

export default function Usuarios() {
  const [produtos, setProdutos] = useState([]);
  const [input, setInput] = useState("");
  const [filtroInput, setFiltroInput] = useState("");
  const [produtoNaSacola, setProdutoNaSacola] = useState([]);
  const [valorSacola, setValorSacola] = useState(0);
  const classes = useStyles();

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const resposta = await fetch("http://localhost:8000/usuario");

      const data = await resposta.json();

      setProdutos(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function filtrarProdutos(produto) {
    if (filtroInput) {
      if (produto.nome.includes(filtroInput)) {
        return produto;
      } else {
        return;
      }
    }
    return produto;
  }

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;

    setFiltroInput(input);
  }

  function adicionarProdutoNaSacola(produto) {
    const produtoJaColocado = produtoNaSacola.find(
      (item) => item.id === produto.id
    );
    if (produtoJaColocado) {
      const novoProdutoNaSacola = produtoNaSacola.map((item) => {
        if (item.id === produto.id) {
          item.quantidade = item.quantidade + 1;
          return item;
        }
        return item;
      });
      return setProdutoNaSacola(novoProdutoNaSacola);
    }
    setProdutoNaSacola([
      ...produtoNaSacola,
      {
        id: produto.id,
        nome: produto.nome,
        imagem: produto.imagem,
        loja: produto.nome_loja,
        quantidade: 1,
        preco: produto.preco,
      },
    ]);
  }

  function aumentarQuantidade(produto) {
    const novoProdutoNaSacola = produtoNaSacola.map((item) => {
      if (item.id === produto.id) {
        item.quantidade = item.quantidade + 1;
        return item;
      }
      return item;
    });
    return setProdutoNaSacola(novoProdutoNaSacola);
  }

  function diminuirQuantidade(produto) {
    let id = null;
    const novoProdutoNaSacola = produtoNaSacola.map((item) => {
      if (item.id === produto.id) {
        item.quantidade = item.quantidade - 1;
        if (item.quantidade === 0) {
          id = item.id;
        }
        return item;
      }
      return item;
    });
    if (id) {
      const indice = novoProdutoNaSacola.findIndex((item) => item.id === id);
      novoProdutoNaSacola.splice(indice, 1);
    }
    return setProdutoNaSacola(novoProdutoNaSacola);
  }

  function aumentarValorDaSacola(produto) {
    setValorSacola((valorSacolaAntigo) => valorSacolaAntigo + produto.preco);
  }

  function diminuirValorDaSacola(produto) {
    setValorSacola((valorSacolaAntigo) => valorSacolaAntigo - produto.preco);
  }

  return (
    <div className={classes.body}>
      <header className={classes.header}>
        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          id="busca"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          label="Busca"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.usuario}>
          <Avatar src="/broken-image.jpg" />
          <Typography variant="h6" component="h2">
            Bem vindo (Glauber)
          </Typography>
        </div>
      </header>
      <div className={classes.main}>
        <div className={classes.listaCards}>
          {produtos.filter(filtrarProdutos).map((produto) => {
            return (
              <Card className={classes.card} key={produto.id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.imagem}
                    image={produto.imagem}
                    title={produto.descricao}
                  ></CardMedia>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <CardContent className={classes.cardNome}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {produto.nome}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {produto.descricao}
                    </Typography>
                  </CardContent>
                  <Typography variant="body2" component="p">
                    Loja: {produto.nome_loja}
                  </Typography>
                  <div className={classes.precoEstoque}>
                    <Typography
                      gutterBottom
                      color="textSecondary"
                      variant="body2"
                      component="p"
                    >
                      {produto.estoque}{" "}
                      {produto.estoque > 1 ? "UNIDADES" : "UNIDADE"}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="p"
                      className={classes.preco}
                    >
                      R${" "}
                      {String((produto.preco / 100).toFixed(2)).replace(
                        ".",
                        ","
                      )}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      adicionarProdutoNaSacola(produto);
                      aumentarValorDaSacola(produto);
                    }}
                  >
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <div className={classes.asside}>
          <div className={classes.sacola}>
            <div className={classes.h1}>
              <h1 className={classes.carrinho}>Sacola</h1>
              <IconButton aria-label="cart" >
                <StyledBadge badgeContent={produtoNaSacola.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </div>
            <div className={classes.conteudo}>
              {produtoNaSacola.map((item) => {
                return (
                  <div className={classes.produtoSacola}>
                    <img src={item.imagem} width="40" heigth="40" />
                    <div className={classes.nomeProdutoSacola}>
                      <h4>{item.nome}</h4>
                      <p>{item.loja}</p>
                    </div>
                    <div>
                      R$:{" "}
                      {String((item.preco / 100).toFixed(2)).replace(".", ",")}
                      <div className={classes.quantidadeProdutoSacola}>
                        <AddIcon
                          onClick={() => {
                            aumentarQuantidade(item);
                            aumentarValorDaSacola(item);
                          }}
                        />
                        <p className={classes.quantidade}>{item.quantidade}</p>
                        <RemoveIcon
                          onClick={() => {
                            diminuirQuantidade(item);
                            diminuirValorDaSacola(item);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.margin}
            >
              Confirme seus dados R${" "}
              {String((valorSacola / 100).toFixed(2)).replace(".", ",")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
