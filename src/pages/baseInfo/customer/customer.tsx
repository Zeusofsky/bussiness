import { ReactElement, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, 
  Badge,
  Tooltip,
} from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';
import { AddCircle, DeleteOutline, Edit} from "@mui/icons-material";
import moment from "moment";

import { RootState } from "../../../redux/store/store";
import { ICustomersState } from "../../../redux/reducers/customerReducer";
import { GenericDataTable } from "../../../components";
import { addCustomer, getCustomers, deleteCustomer, editCustomer } from "../../../redux/actionCreators/customerActions";
import { ICustomer, ICustomerEdit, ICustomerPost } from "../../../models/customer";
import CustomerEdit from "./components/CustomerEdit";


const mapTOCustomerEdit = (customers: ICustomer[]) => {
  const data: ICustomerEdit[] = []
  customers.forEach(element => {
    let elementEditable: ICustomerEdit
    const edited = String(element.id)
    const deleted = String(element.id)
    elementEditable = {...element, edited, deleted}
    data.push(elementEditable)
  });
  return data
}

const Customer: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ editRecordId, setEditRecordId ] = useState<number>(0)

  useEffect(() => {
    dispatch<any>(getCustomers());
  }, [dispatch]);

  const customersState: ICustomersState = useSelector((state: RootState) => state.customers)
  const customerEdit: ICustomerEdit[] = mapTOCustomerEdit(customersState.customers)
  const [showValidation, setShowValidation] = useState<boolean>(true);
  const [customer, setCustomer] = useState<ICustomerPost>({
      FirstName: "",
      LastName: "",
      DateOfBirth: moment(new Date()).format("YYYY-MM-DD"),
      CountryCode: "",
      PhoneNumber: "",
      Email: "",
      BankAccountNumber: ""
    });

  const initAddRecordId = () => {
    setEditRecordId(0)
    setIsOpen(true);
  }

  const initEditRecordId = (source: ICustomerEdit[], id: number) =>{
    for (var i = 0; i < source.length; i++) {
      if (source[i].id === id) {
        setCustomer({
          FirstName: source[i].firstName,
          LastName: source[i].lastName,
          DateOfBirth: moment(new Date(source[i].dateOfBirth)).format("YYYY-MM-DD"),
          CountryCode: source[i].countryCode,
          PhoneNumber: source[i].phoneNumber,
          Email: source[i].email,
          BankAccountNumber: source[i].bankAccountNumber  
        });
        setShowValidation(false)
        setEditRecordId(id)
        setIsOpen(true);
      }
    }
  }

  const removeCustomer = (id: number) => {
    if (id)
      dispatch<any>(deleteCustomer(id))
        .then((response: any) => {
          // alert(response);
          dispatch<any>(getCustomers());
        })
        .catch((error: any) => {
          // alert(error);
        });
  };

  return (
    <Box 
      sx={{
        flexGrow: 1,
        backgroundColor: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-testid="customer-box"
    >
      <GenericDataTable
        headers={{
          id: "Id",
          firstName: "First Name",
          lastName: "Last Name",
          dateOfBirth: "Date of Birth",
          countryCode: "Country Code",
          phoneNumber: "Phone Number",
          email: "Email",
          bankAccountNumber: "Bank Account Number",
          edited: "Edit",
          deleted: "Delete"
        }}
        items={customerEdit}
        customRenderers={{
          edited: (row: ICustomer) => {
            return(
              <Badge
                sx={{width:20, m:.25, px:.1}}
                // size="small"
                onClick={() => 
                  initEditRecordId(customerEdit, row.id)
                }
              >
                <Edit sx={{width:20, mx:.1}}/>
              </Badge>
            )
          },
          deleted: (row: ICustomer) => {
            return(
              <Badge
                sx={{width:20, m:.25, px:.1}}
                // size="small"
                onClick={() => 
                  window.confirm("Are you sure you wanna delete this record?") ?
                  removeCustomer(row.id) : 
                  ''
                }
                data-testid="delete-button"
              >
                <DeleteOutline sx={{width:20, mx:.1}}/>
              </Badge>
            )
          }
        }}
      />
        <Box 
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",  
            alignItems: "flex-end"
          }}
        >
          <Tooltip title='Add new customer' arrow>
            <AddCircle 
              sx={{ width:25, mt:3, mb:1 }} 
              onClick={() => initAddRecordId()}/>
          </Tooltip>
        </Box>
        <Box 
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",  
          }}
        >
          {isOpen ? 
          <CustomerEdit    
            customer={customer} 
            setCustomer={setCustomer}
            editRecordId={editRecordId}
            setEditRecordId={setEditRecordId}
            showValidation={showValidation}
            setShowValidation={setShowValidation}
            setIsOpen={setIsOpen}
            addCustomer={addCustomer}
            getCustomers={getCustomers}
            editCustomer={editCustomer}
          />
          : ''
          }
        </Box>

      </Box>
  );
};

export default Customer;