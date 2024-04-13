import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input
} from "@material-tailwind/react";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomButton from "../../components/CustomButton";
import { BiX, BiEditAlt, BiSolidInfoCircle } from "react-icons/bi";
import { formatDate } from '../../helpers/dateFormat';

const ModalAccount = ({open, handleOpen, type}) => {
  const today = new Date()
  const exp = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate())

  const [account, setAccount] = useState(
    {
      username: "",
      name: "",
      id: "",
      birthday: "",
      sex: "Male",
      email: "",
      address: "",
      makingDay: today,
      invalidDay: exp,
      image: "",
    }
  );

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  return (
    <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1 uppercase" variant="h4">
              {type === 0 ? "add" : "edit"} READER INFORMATION
            </Typography>
          </DialogHeader>
          <BiX className="mr-3 h-8 w-8 hover:cursor-pointer" onClick={handleOpen} />
        </div>
        <DialogBody className="py-0">
          <div className="relative w-16 h-16 mb-4">
            {/* {!account.image ? 
            <BiUserCircle className='w-full h-full' /> :
            <img src={account?.image} alt="upload" className="object-cover w-full h-full rounded-full" />
            } */}
            <img src="https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg" alt="upload" className="object-cover w-full h-full rounded-full" />
            <div
              className="absolute bottom-1 -right-0.5 w-5 h-5 rounded-full bg-red flex items-center justify-center"
            >
              <input 
                type="file" 
                accept="image/png,image/jpeg" 
                className="hidden" 
                // onChange={changePhoto}
              />
              <BiEditAlt 
                className="text-white hover:cursor-pointer" 
                onClick={() => document.querySelector('input[type="file"]').click()} 
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
          <Input
              variant="standard"
              label="Email"
              required
              type="email"
              name="email"
              value={account.email}
              onChange={handleChangeInfo}
            />
            <Input
              variant="standard"
              label="Name"
              required
              name="name"
              value={account.name}
              onChange={handleChangeInfo}
            />
            <Input
              variant="standard"
              label="ID number"
              required
              onInput={(e) =>
                (e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1"))
              }
              pattern=".{12}"
              maxLength={12}
              name="id"
              value={account.id}
              onChange={handleChangeInfo}
            />
            <Input
              variant="standard"
              label="Birthdate"
              required
              type="date"
              name="birthday"
              value={account.birthday === '' ? '' : new Date(account.birthday).toISOString().slice(0, 10)}
              onChange={handleChangeInfo}
            />
            <div className="flex gap-4 self-end"> 
              <CustomRadioButton
                label="Male"
                value="Male"
                name="sex"
                checked={account.sex === "Male"}
                onChange={handleChangeInfo}
              />
              <CustomRadioButton
                label="Female"
                value="Female"
                name="sex"
                checked={account.sex === "Female"}
                onChange={handleChangeInfo}
              />
            </div>
            <Input
              variant="standard"
              label="Address"
              required
              name="address"
              value={account.address}
              onChange={handleChangeInfo}
            />
            <Input
              variant="standard"
              label="Registration date"
              readOnly
              name="makingDay"
              labelProps={{ className: "peer-disabled:text-textDisable" }}
              value={formatDate(account.makingDay)}
            />
            <Input
              variant="standard"
              label="Expiration date"
              readOnly
              name="invalidDay"
              labelProps={{ className: "peer-disabled:text-textDisable" }}
              value={formatDate(account.invalidDay)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="justify-center pt-4">
          <CustomButton label="Save changes" type="submit" />
        </DialogFooter>
      </Dialog>
  )
}

export default ModalAccount