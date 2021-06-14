import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container:{
    width: 'min-content',
  },
  deleteIcon: {
    padding: 12,
    backgroundColor: "#FF505F",
    borderRadius: "48px",  
    margin: "22px 0 0 22px",
    zIndex: 2,
  },
  botoes: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 20,
    marginTop: 20,
  },
}));

export default useStyles;
