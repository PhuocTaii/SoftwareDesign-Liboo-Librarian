import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import { BiX, BiTrash } from "react-icons/bi";

const ModalRequest = ({open, handleOpen, isAvailable, details}) => {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
    >
      <div className="flex items-center justify-between">
        <DialogHeader className="flex gap-4 items-center">
          <Typography variant="h4">Borrow Request</Typography>
        </DialogHeader>
        <BiX className="mr-3 h-8 w-8 hover:cursor-pointer" onClick={handleOpen} />
      </div>
      <DialogBody>
        {isAvailable ? "This request is available" : "This request is unavailable"}
      </DialogBody>
      <DialogFooter className="flex gap-4">
        <Button
          variant="text"
          onClick={handleOpen}
          className="w-fit"
        >
          <span>Reject</span>
        </Button>
        {isAvailable && <CustomButton label='Accept' classes='w-fit' type='submit' />}
      </DialogFooter>
    </Dialog>
  );
}

export default ModalRequest;