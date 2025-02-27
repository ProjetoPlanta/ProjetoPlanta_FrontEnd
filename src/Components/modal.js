import { Dialog,Box, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const Modal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>`{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", gap: 2, pb: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Deletar
        </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;