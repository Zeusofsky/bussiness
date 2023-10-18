import { ReactElement, FC, useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, darken, useTheme } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table'; // If using TypeScript (optional, but recommended)

import { IUser } from "../../../models/user";
import { RootState } from "../../../redux/store/store";
import { addUser, getUsers, deleteUser, editUser } from "../../../redux/actionCreators/userActions";
import { IUsersState } from "../../../redux/reducers/userReducer";
import { useAppSelector } from "../../../redux/store/hooks";


// const mapTOUserEdit = (customers: IUser[]) => {
//   const data: IUserEdit[] = []
//   customers.forEach(element => {
//     let elementEditable: ICustomerEdit
//     const edited = String(element.id)
//     const deleted = String(element.id)
//     elementEditable = {...element, edited, deleted}
//     data.push(elementEditable)
//   });
//   return data
// }

const User: FC<any> = (): ReactElement => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ editRecordId, setEditRecordId ] = useState<number>(0)

  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);

  const users: IUser[] = useAppSelector((state: RootState) => state.users.users)
  // console.log('----users: ', users)
    //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
    const columns = useMemo<MRT_ColumnDef<IUser>[]>(
      () => [
        {
          accessorKey: 'id', //simple recommended way to define a column
          header: 'کد',
          maxSize: 80,
          enableColumnDragging: false,
          enableResizing: false,
          enableGrouping: false,
          // muiTableBodyCellProps: {
          //   align: 'center',
          // },
          },
        // {
        //   accessorFn: (originalRow) => originalRow.contractType, //alternate way
        //   id: 'contractType', //id required if you use accessorFn instead of accessorKey
        //   header: 'نوع قرارداد',
        //   maxSize: 100,
        //   enableColumnDragging: false,
        //   enableResizing: false,
        // },
        {
          accessorKey: 'first_name', //simple recommended way to define a column
          header: 'نام',
          maxSize: 100,
          enableColumnDragging: false,
          enableResizing: false,
          enableGrouping: false,
        },
        {
          accessorKey: 'last_name', //simple recommended way to define a column
          header: 'نام خانوادگی',
          maxSize: 100,
          enableColumnDragging: false,
          enableResizing: false,
        },
        {
          accessorKey: 'username', //simple recommended way to define a column
          header: 'نام کاربری',
          maxSize: 80,
          enableColumnDragging: false,
          enableResizing: false,
          enableGrouping: false,
        },
        // {
        //   accessorKey: 'coordinator', //simple recommended way to define a column
        //   header: 'هماهنگ کننده',
        //   maxSize: 80,
        //   enableColumnDragging: false,
        //   enableResizing: false,
        //   enableGrouping: false,
        // },
        // {
        //   accessorKey: 'currency', //simple recommended way to define a column
        //   header: 'واحد پول',
        //   maxSize: 60,
        //   enableResizing: false,
        //   enableColumnDragging: false,
        // },
        {
          accessorKey: 'email', //simple recommended way to define a column
          header: 'پست الکترونیکی',
          maxSize: 80,
          enableColumnDragging: false,
          enableResizing: false,
          enableGrouping: false,
        },
        {
          accessorKey: 'is_active', //simple recommended way to define a column
          header: 'فعال',
          maxSize: 80,
          enableColumnDragging: false,
          enableResizing: false,
          enableGrouping: false,
        },
      ],
      [],
    );
  // console.log('columns: ', columns)

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: '90%'
        }}
      >
        {/* <Typography variant="h3">User</Typography> */}
        <MaterialReactTable
          columns={columns}
          data={users}
          // enableRowSelection //enable some features
          enableColumnOrdering
          // enableGlobalFilter={false} //turn off a feature
          enableColumnResizing
          columnResizeMode="onEnd" //instead of the default "onChange" mode
          enableGrouping
          enableStickyHeader
          enableStickyFooter
          muiTableBodyProps={{
            sx: {
              //stripe the rows, make odd rows a darker color
              '& tr:nth-of-type(odd)': {
                backgroundColor: darken(theme.palette.background.paper, 0.1),
              },
            },
          }}
          muiTableHeadRowProps={{
            sx: {
              backgroundColor: darken(theme.palette.background.paper, 0.6),
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              borderRight: '1px solid #e0e0e0', //add a border between columns
              color: 'rgb(255, 255, 255, 0.9)',
            },
            align: 'center', 
          }}
          muiTableBodyCellProps= {{
            sx: {
              borderRight: '1px solid #e0e0e0', //add a border between columns
            },
            align: 'center',
          }}
        />
      </Box>
    </Box>
  );
};

export default User;