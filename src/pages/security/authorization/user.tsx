import React, { useCallback, useMemo, useState, ReactElement, FC, useEffect } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,darken, useTheme,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { data, states } from './makeData';
import { useDispatch, useSelector } from "react-redux";

import { IUser, IUserPost } from "../../../models/user";
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
  const users: IUser[] = useAppSelector((state: RootState) => state.users.users)
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ editRecordId, setEditRecordId ] = useState<number>(0)
  const [tableData, setTableData] = useState<IUser[]>(() => users);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);

  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const addColumns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
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

  const handleCreateNewRow = (values: IUser) => {
    const request: IUserPost = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      password: "12357",
      email: values.email
    }
    dispatch<any>(addUser(request))
    users.push(values);
    setTableData([...users]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<IUser>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        //send/receive api updates here, then refetch or update local table data for re-render
        dispatch<any>(editUser(values));
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<IUser>) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('first_name')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      const deletedId = Number(row.getValue('id'))
      dispatch<any>(deleteUser(deletedId))
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<IUser>,
    ): MRT_ColumnDef<IUser>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },

    ],
    [getCommonEditTextFieldProps],
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Account
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<IUser>[];
  onClose: () => void;
  onSubmit: (values: IUser) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New User</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (column.accessorKey !== 'id' &&
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              /> 
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export default User;
