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
import { base_url, getError } from "../../Utils/Utils";

export default function EditQuantityModal({ food }) {
  const [open, setOpen] = React.useState(false);

  const [newQuantity, setNewQuantity] = React.useState("");
  const [title, setTitle] = React.useState("");

  //get details
  async function getPrdct() {
    try {
      const response = await fetch(`${base_url}recipe/cookedFood/${food.id}`);
      const getprdct = await response.json();
      setTitle(getprdct.foodName);
      setNewQuantity(getprdct.quantity);
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
      const body = { newQuantity };
      let updatestock = await fetch(
        `${base_url}recipe/update-food/${food.id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json",
            // authorization: `Bearer ${Token.token}`,
          },
        }
      );
      const foodNam = await updatestock.json();
      console.log(foodNam)
      // window.location = "/admin-dashboard/foods";
      toast.success("food quantity update successfully");
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
          <DialogTitle>Update Food Quantity</DialogTitle>
          <DialogContent>Update Food Quantity</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Food Name</FormLabel>
                <Input value={title} />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
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
