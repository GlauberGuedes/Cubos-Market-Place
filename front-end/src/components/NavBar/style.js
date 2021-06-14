import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 34,
    marginTop: 113,
  },
  appbar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#434343",
    borderRadius: "0px 0px 32px 0px",
    width: 138,
    minHeight: "100vh",
    left: 0,
  },
  close: {
    width: 33,
    height: 33,
    cursor: "pointer",
  },
  cursor: {
    cursor: "pointer",
  },
}));

export default useStyles;
