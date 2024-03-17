import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import { base_url, getError } from "../../Utils/Utils";
import { toast } from "react-toastify";

export default function DeleteProductModel({ product }) {
  // const Token = JSON.parse(localStorage.getItem("token"));
  const [open, setOpen] = React.useState(false);
  //delete product
  async function deleteProduct(id) {
    try {
      const del = await fetch(`${base_url}recipe/cookedFood/${id}`, {
        method: "DELETE",
        // headers: {
        //   authorization: `Bearer ${Token.token}`,
        // },
      });
    //   console.log(del);
      window.location = "/admin-dashboard/foods";
      toast.success("product deleted successfully");
    } catch (err) {
        toast.error(getError(err));
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <DeleteForever sx={{ color: "red" }} />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            level="h2"
            startDecorator={<WarningRoundedIcon sx={{ color: "red" }} />}
            sx={{ color: "red" }}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            Are you sure you want to Permanantly Delete
            {" "}
            {product.foodName} ?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
