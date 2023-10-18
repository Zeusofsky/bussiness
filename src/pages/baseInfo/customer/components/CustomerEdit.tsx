import { ReactElement, FC } from "react";
import { useDispatch } from "react-redux";
import { 
  Box, 
  Typography, 
  Button,
  SelectChangeEvent,
} from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';
import { Person } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import validator from 'validator';

import { ICustomerPost, ICustomerPut } from "../../../../models/customer";
import TextBox from "../../../../components/utilities/TextBox";
import PhoneNumberBox from "../../../../components/utilities/PhoneNumberBox";

interface CustomerEditProps {
    customer: ICustomerPost;
    setCustomer: (customer: any) => void;
    editRecordId: number;
    setEditRecordId: (editRecordId: number) => void;
    showValidation: boolean;
    setShowValidation: (showValidation: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
    addCustomer: (customer: ICustomerPost) => void;
    getCustomers: () => void;
    editCustomer: (customer: ICustomerPut) => void;
}
const CustomerEdit: FC<CustomerEditProps> = ({ 
    customer,
    setCustomer,
    editRecordId,
    setEditRecordId,
    showValidation,
    setShowValidation,
    setIsOpen,
    addCustomer, 
    getCustomers, 
    editCustomer,
}): ReactElement => {
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(
          (validator.isEmpty(customer.FirstName)) ||
          (validator.isEmpty(customer.LastName)) ||
          (!validator.isEmpty(customer.PhoneNumber) && (!validator.isMobilePhone(customer.PhoneNumber) || customer.PhoneNumber.length < 6 || customer.PhoneNumber.length > 20 )) || 
          (!validator.isEmail(customer.Email) || validator.isEmpty(customer.Email)) ||
          (!validator.isEmpty(customer.BankAccountNumber) && (!validator.isNumeric(customer.BankAccountNumber) || customer.BankAccountNumber.length > 40))
          )
        {
          setShowValidation(true)
        }
        else
        {
          setShowValidation(false)
        }

        setCustomer((prevState: any) => ({
          ...prevState,
          [name]: value
        }));

        switch(name){
          case "FirstName": 
          case "LastName": 
            if(validator.isEmpty(value)) 
            {setShowValidation(true);
            // console.log('1')
          }
            break;
          case "PhoneNumber": 
            if(!validator.isEmpty(value) && 
              (!validator.isMobilePhone(value) || 
                value.length < 6 || 
                value.length > 20 )) 
            {setShowValidation(true);
            // console.log('2')
          }
            break;
          case "Email": 
            if(!validator.isEmail(value) || validator.isEmpty(value)) 
            {setShowValidation(true);
            // console.log('3')
          }
            break
          default: 
            if(!validator.isEmpty(value) && (!validator.isNumeric(value) || value.length > 40)) 
            {setShowValidation(true);
            // console.log('4')
          }
            break
        }
    };
    
    const handleDateChange = (newValue: Date | null)=>{
        setCustomer((prevState: any) => ({
            ...prevState,
            DateOfBirth: moment(newValue).format("YYYY-MM-DD")
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
        setCustomer((prevState: any) => ({
            ...prevState,
            CountryCode: e.target.value
          }));
    }

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    
        const editedCutomer: ICustomerPut = {
          Id: editRecordId,
          FirstName: customer.FirstName,
          LastName: customer.LastName,
          DateOfBirth: moment(customer.DateOfBirth).format("YYYY-MM-DD"),
          CountryCode: customer.CountryCode,
          PhoneNumber: customer.PhoneNumber,
          Email: customer.Email,
          BankAccountNumber: customer.BankAccountNumber
        }
        const action =
        editRecordId === 0
          ? addCustomer(customer)
          : editCustomer(editedCutomer)
    
        dispatch<any>(action)
          .unwrap()
          .then((response: any) => {
            // alert(response + ' added successfully');
            resetForm();
            dispatch<any>(getCustomers());
            setIsOpen(false);
            setEditRecordId(0)
          })
          .catch((error: any) => {
            // alert(error + ' failed to add');
          });
    };

    const resetForm = () => {
        setCustomer({
          FirstName: "",
          LastName: "",
          DateOfBirth: moment(new Date()).format("YYYY-MM-DD"),
          PhoneNumber: "",
          Email: "",
          BankAccountNumber: ""
        });
        setShowValidation(true);
      }
    
    const cancelSubmit = () => {
        resetForm()
        setIsOpen(false)
        setEditRecordId(0)
    }

    return (
        <Box 
            display='block'
            m='auto'
            px={3}
            pt={3}
            width={400}
            border={1}
            borderRadius={4}
            boxShadow={12}
        >
            <Box
                flexGrow= {1}
                display= "flex"
                py={2}
                px={3}
                sx={{
                    justifyContent:"space-between",
                    backgroundColor:"inherit"
            }}
            >
                <Typography variant="h6">Add Customer</Typography>
                <Person sx={{ width:25 }} />
            </Box>
            <Box display='block' px={3} mb={3} data-testid="customer-edit-box">
                <TextBox
                    id={"outlined-input-first-name"}
                    name={"FirstName"}
                    title={"First Name"}
                    value={customer.FirstName}
                    handleInputChange={handleInputChange}
                    errorCondition={validator.isEmpty(customer.FirstName)}
                    errorMessage={"FirstNme can not be empty."}
                />
                <TextBox
                    id={"outlined-input-last-name"}
                    name={"LastName"}
                    title={"Last Name"}
                    value={customer.LastName}
                    handleInputChange={handleInputChange}
                    errorCondition={validator.isEmpty(customer.LastName)}
                    errorMessage={"LastName can not be empty."}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker 
                        sx={{name:"DateOfBirth"}} 
                        value={new Date(customer.DateOfBirth)}
                        onChange={(newValue: Date | null) => handleDateChange(newValue)}
                    />
                </LocalizationProvider>
                {/* handleSelectChange={handleSelectChange} */}

                <PhoneNumberBox 
                    countryCode={customer.CountryCode}
                    handleSelectChange={handleSelectChange}
                    id={"outlined-input-phone-number"}
                    name={"PhoneNumber"}
                    title={"Phone number"}
                    value={customer.PhoneNumber}
                    handleInputChange={handleInputChange}
                    errorCondition={!validator.isEmpty(customer.PhoneNumber) && 
                        (!validator.isMobilePhone(customer.PhoneNumber) || 
                        customer.PhoneNumber.length < 6 ||
                        customer.PhoneNumber.length > 20)}
                    errorMessage={"wrong phoneNumber format."}
                />
                <TextBox
                    id={"outlined-input-email"}
                    name={"Email"}
                    title={"Email address"}
                    value={customer.Email}
                    handleInputChange={handleInputChange}
                    errorCondition={!validator.isEmail(customer.Email) || validator.isEmpty(customer.Email)}
                    errorMessage={"wrong email format."}
                />
                <TextBox
                    id={"outlined-input-bank-account-number"}
                    name={"BankAccountNumber"}
                    title={"Bank account number"}
                    value={customer.BankAccountNumber}
                    handleInputChange={handleInputChange}
                    errorCondition={!validator.isEmpty(customer.BankAccountNumber) && 
                        (!validator.isNumeric(customer.BankAccountNumber) || 
                        customer.BankAccountNumber.length > 40 )}
                    errorMessage={"wrong bank account number format."}
                />

                <Box display='flex' justifyContent='space-evenly' >
                {
                    !showValidation ?
                    <Button 
                    variant="contained" color="primary" size='small' 
                    sx={{fontSize:{xs:'9pt', sm:'9pt', md:'10pt', mx:2}}}
                    onClick={(e) => submit(e)}
                    >
                    Save
                    </Button>
                    :
                    <Button 
                    disabled
                    variant="contained" color="primary" size='small' 
                    sx={{fontSize:{xs:'9pt', sm:'9pt', md:'10pt', mx:2}}}
                    onClick={(e) => submit(e)}
                    >
                    Save
                    </Button>
                }
                    <Button 
                    variant="contained" color="primary" size='small'  
                    sx={{fontSize:{xs:'9pt', sm:'9pt', md:'10pt'}}}
                    onClick={() => cancelSubmit()}
                    >
                    Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CustomerEdit;