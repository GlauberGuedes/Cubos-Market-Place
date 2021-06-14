import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
  },
  produtos: {
    padding: "78px 0 25px 212px",
  },
  button: {
    marginTop: 58,
    width: 200,
    backgroundColor: "#007DFF",
  },
  titulo: {
    marginBottom: 85,
  },
  subtitulo: {
    marginBottom: 37,
  },
  listaCards: {
    display: 'flex',
    gap: 24,
    overflowX: 'auto',
  },
  card: {
    width: 232,
    minWidth: 232,
    minHeight: 433,
    marginBottom: 13,
  },
  imagem: {
    width: 232,
    height: 240,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useStyles;
