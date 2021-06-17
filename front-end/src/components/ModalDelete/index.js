import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState } from "react";

export default function Modal({ id, setErro, setOpenLoading, token, getProducts }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function stop(e) {
    e.stopPropagation();
  }

  async function removerProduto () {
    setErro('');
    setOpenLoading(true);
    console.log(token)
    try {
      const resposta = await fetch(`http://localhost:8000/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await resposta.json();

      setOpenLoading(false);

      if(!resposta.ok) {
        console.log(data)
        return setErro(data);
      }

      handleClose();
      getProducts();

    }catch(error) {
      setOpenLoading(false);
      setErro(error.message);
    }
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <DeleteSweepIcon
        className={classes.deleteIcon}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Remover produto do catálogo?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" component="p">
            Esta ação não poderá ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions className={classes.botoes}>
          <Button variant="contained" onClick={handleClose} color="primary">
            Manter produto
          </Button>
          <Button variant="contained" type="submit" color="secondary" onClick = {removerProduto}>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
