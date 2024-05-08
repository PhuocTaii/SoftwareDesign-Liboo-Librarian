import React, {useEffect, useState} from "react";
import { Input, Checkbox } from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import { formatDate } from '../../helpers/dateFormat';
import { getReturnBookInfo, getTransactionBook, returnBook } from "./transactionApi";
import { currencyFormat } from "../../helpers/currency";

const NOTE = {
  UNCHECK: '',
  ON_TIME: 'On time',
  OVERDUE: 'Overdue',
}
// Return page
const Return = () => {
  const today = new Date()
  const [transaction, setTransaction] = useState({
    email:'', 
    isbn: '', 
    returningDate: formatDate(today), 
    note: NOTE.UNCHECK, 
    lost: false,
    fine: ''
  })

  const [transactionBookData, setTransactionBookData] = useState(null)

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setTransaction({
      ...transaction,
      note: NOTE.UNCHECK,
      fine: '',
      [name]: value
    });
  }

  const handleReturn = (e) => {
    e.preventDefault();

    if(transaction.note === NOTE.UNCHECK) {
      getTransactionBook(transaction.email, transaction.isbn).then((transactionBook) => {
        console.log(transactionBook)
        if(transactionBook != null) {
          setTransactionBookData(transactionBook)
          getReturnBookInfo(transactionBook.id, transaction.lost).then((data) => {
            if(data != null) {
              setTransaction({
                ...transaction,
                note: (data.diff <= 0) ? NOTE.ON_TIME : NOTE.OVERDUE,
                fine: data.fine
              })
            }
          })
        }
      })
    }
    else {
      returnBook(transactionBookData.id, transaction.lost).then((data) => {
        if(data != null) {
          setTransaction({
            email:'', 
            isbn: '', 
            returningDate: formatDate(today), 
            note: NOTE.UNCHECK, 
            lost: false,
            fine: ''
          })
          setTransactionBookData(null)
          document.getElementById('return-lost-checkbox').checked = false
        }
      })
    }
  }
  
  return (
    <div className="flex flex-col w-full h-full gap-8">
      <form className="w-full space-y-5" onSubmit={(e) => handleReturn(e)}>
        <p className="text-2xl font-semibold">RETURN BOOKS</p>
        <div className="grid grid-cols-2 gap-5">
          <Input
            variant="standard"
            label="Email"
            name="email"
            value={transaction.email}
            onChange={handleChangeInfo}
            required
          />  
          <Input
            variant="standard"
            label="ISBN-13"
            name="isbn"
            value={transaction.isbn}
            onChange={handleChangeInfo}
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            pattern=".{13}"
            maxLength={13}
            required
          />
          <Input
            variant="standard"
            label="Returning date"
            name="returningDate"
            value={transaction.returningDate}
            readOnly
          />
          <div className='flex gap-2'>
            <Input
              variant="standard"
              label="Note"
              name="note"
              value={transaction.note}
              readOnly
              containerProps={{className: 'w-1/2'}}
            />
            <Checkbox 
              label='Lost'
              name="lost"
              id="return-lost-checkbox"
              onChange={(e) => setTransaction({
                ...transaction, 
                lost: e.target.checked,
                note: NOTE.UNCHECK,
              })}
            />
          </div>
          <Input
            variant="standard"
            label="Fine"
            name="fine"
            value={currencyFormat(transaction.fine)}
            readOnly
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton 
            label={transaction.note === NOTE.UNCHECK ? "Check" : "Return"} 
            type="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default Return
