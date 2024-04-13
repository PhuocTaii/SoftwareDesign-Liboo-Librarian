import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea
} from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import { BiX, BiEditAlt, BiCloudUpload } from "react-icons/bi";

const ModalBook = ({open, handleOpen, type}) => {
  const [book, setBook] = useState(
    {
      ISBN: '',
      name: '',
      author: '',
      publisher: '',
      publishYear: '',
      genre: [],
      price: '',
      quantity: 1,
      borrowed: 0,
      // image: '',
      image: 'https://salt.tikicdn.com/cache/w1200/media/catalog/product/t/o/toi_thay_hoa_vang.jpg',
      description: '',
    }
  );
  const [tempGenre, setTempGenre] = useState(book.genre.join(', '));

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    if (name === 'genre') {
      setTempGenre(value);
      setBook({...book, genre: value.split(',').map((item) => item.trim())});
    }
    else {
      setBook({...book, [name]: value});
    }
  }

  return (
    <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1 uppercase" variant="h4">
              {type === 0 ? "add" : "edit"} BOOK INFORMATION
            </Typography>
          </DialogHeader>
          <BiX className="mr-3 h-8 w-8 hover:cursor-pointer" onClick={handleOpen} />
        </div>
        <DialogBody className="py-0">
          <div 
            className="relative w-16 h-16 mb-4 hover:cursor-pointer"
            onClick={() => document.querySelector('input[type="file"]').click()} 
          >
            {!book.image ? 
              <div className="w-full h-full bg-blue-gray-100 rounded-full flex items-center justify-center">
                <BiCloudUpload size="2rem" />
              </div>:
              <>
                <img src={book?.image} alt="upload" className="object-cover w-full h-full rounded-full" />
                <div
                  className="absolute bottom-1 -right-0.5 w-5 h-5 rounded-full bg-red flex items-center justify-center"
                >
                  <BiEditAlt 
                    className="text-white" 
                  />
                </div>
              </>
            }
            <input 
              type="file" 
              accept="image/png,image/jpeg" 
              className="hidden" 
              // onChange={changePhoto}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
            <Input
              variant="standard"
              label="ISBN-13"
              required
              name="ISBN"
              value={book.ISBN}
              onInput={(e) =>
                (e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1"))
              }
              pattern=".{13}"
              maxLength={13}
              onChange={handleChangeInfo}
            />
            <Input
              variant="standard"
              label="Name"
              required
              onChange={handleChangeInfo}
              name="name"
              value={book.name}
            />
            <Input
              variant="standard"
              label="Author"
              required
              onChange={handleChangeInfo}
              name="author"
              value={book.author}
            />
            <Input
              variant="standard"
              label="Genre"
              required
              onChange={handleChangeInfo}
              value={tempGenre}
              name="genre"
            />
            <Input
              variant="standard"
              label="Publisher"
              required
              onChange={handleChangeInfo}
              name="publisher"
              value={book.publisher}
            />
            <Input
              variant="standard"
              label="Publish Year"
              required
              onChange={handleChangeInfo}
              name="publishYear"
              value={book.publishYear}
              type="number" 
              min="1000" 
              max="9999" 
              step="1"
            />
            <Input
              variant="standard"
              label="Quantity"
              required
              onChange={handleChangeInfo}
              value={book.quantity}
              name="quantity"
              type="number"
              min={1}
            />
            <Input
              variant="standard"
              label="Price"
              required
              onChange={handleChangeInfo}
              value={book.price}
              name="price"
              type="number"
              min={0}
            />
            <div className='md:col-span-2'>
              <Textarea 
                variant="outlined" 
                label="Description"
                onChange={handleChangeInfo}
                name="description"
                value={book.description}
                required
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-center pt-4">
          <CustomButton label="Save changes" type="submit" />
        </DialogFooter>
      </Dialog>
  )
}

export default ModalBook