import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#dbd9d9',
    padding: '15px 50px 15px 50px',
    marginBottom: 40,
    boxShadow: '0 0 8px black'
  },
  input: {
    width: 400,
  },
  usuario: {
    display: 'flex',
    gap: 20
  },
  main: {
    display: 'flex',
    gap: 30,
    padding: '0 30px 0 30px',
  },
  listaCards: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    width: 1600
  },
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: 300,
    maxHeight: 170,
    marginBottom: 13,
    borderRadius: 24,
    boxShadow: '0 0 4px black',
  },
  imagem: {
    maxWidth: 130,
    height: 170,
    margin: 0,
  },
  cardActions: {
    width: 600,
    padding: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'flex-start',
  },
  cardNome: {
    padding: 0,
    marginLeft: 5
  },
  preco: {
    fontWeight: 600,
  },
  precoEstoque: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    width: 150
  },
  asside: {
    width: 500,
  },
  sacola: {
    borderRadius: 5,
    background: '#dbd9d9',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 4px black',
  },
  h1: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 5,
    background: '#b6b5b5',
    textAlign: 'center'
  },
  conteudo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding:15
  },
  produtoSacola: {
    display:'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    boxShadow: '0 0 2px 0 black',
  },
  nomeProdutoSacola: {
    marginRight: 'auto',
  },
  quantidadeProdutoSacola: {
    display: 'flex',
    gap: 3
  },
  quantidade: {
    marginTop: 3
  },
  carrinho: {
    marginLeft: 110
  }
}));

export default useStyles;