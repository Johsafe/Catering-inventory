import * as React from "react";
import { Button } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { base_url, getError } from "../Utils/Utils";

export default function EditStockModal({ product }) {
  const [open, setOpen] = React.useState(false);

  const [newStock, setNewStock] = React.useState("");
  const [title, setTitle] = React.useState("");

  //get details
  async function getPrdct() {
    try {
      const response = await fetch(
        `${base_url}product/${product.id}`
      );
      const getprdct = await response.json();
      setTitle(getprdct.title);
      setNewStock(getprdct.inStock);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  React.useEffect(() => {
    getPrdct();
  }, []);
  // update stock
  const updateStock = async (e) => {
    e.preventDefault();
    try {
      const body = { newStock };
      let updatestock = await fetch(
        `${base_url}product/${product.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json",
            // authorization: `Bearer ${Token.token}`,
          },
        }
      );
      await updatestock.json();
      window.location = "/product";
      toast.success("product stock update successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Edit products Stock</DialogTitle>
          <DialogContent>Refill stock</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input value={title} />
              </FormControl>
              <FormControl>
                <FormLabel>InStock</FormLabel>
                <Input
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                />
              </FormControl>
              <Button type="submit" onClick={updateStock}>
                Edit Stock
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
