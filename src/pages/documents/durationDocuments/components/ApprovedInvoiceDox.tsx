/* eslint-disable no-sequences */
import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_Row,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { IApprovedInvoiceDoc, IRequestApprovedInvoiceDoc, IRequestPartialApprovedInvoiceDoc } from '../../../../models/approvedInvoiceDox';
import { RootState } from '../../../../redux/store/store';
import { IApprovedInvoiceDoxState } from '../../../../redux/reducers/approvedInvoiceDoxReducer';
import { toastInfo, toastWarning } from '../../../../services/toasters';
import { Delete, Edit, DownloadOutlined } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import { httpGenerator } from '../../../../services';
import { AdapterJalali, FileInput } from '../../../../components';


let selectedFiles: File[] = [];
// export type FileInputProps = {
//   fileList: File[];
//   onChange(fileList: FileList): void;
// };
interface ApprovedInvoiceDocProps {
    currentContractId: number, 
    currentDateId: number,
    getApprovedInvoiceDoc: (contractId: number, dateId: number) => void,
    addApprovedInvoiceDoc: (request: IRequestApprovedInvoiceDoc) => void,
    editApprovedInvoiceDoc: (id: number, request: IRequestApprovedInvoiceDoc) => void,
    partialEditApprovedInvoiceDoc: (id: number, request: IRequestPartialApprovedInvoiceDoc) => void,
    deleteApprovedInvoiceDoc: (id: number) => void,
}
const ApprovedInvoiceDoc: FC<ApprovedInvoiceDocProps> = ({ 
    currentContractId, 
    currentDateId, 
    getApprovedInvoiceDoc,
    addApprovedInvoiceDoc,
    editApprovedInvoiceDoc,
    partialEditApprovedInvoiceDoc,
    deleteApprovedInvoiceDoc,
  }): ReactElement => {
    // const inputRef = useRef<HTMLInputElement>(null);
    // useEffect(() => {
    //   if (inputRef.current) {
    //     const dataTransfer = new DataTransfer();
    //     dataTransfer.items.add(selectedFile!);
    //     inputRef.current.files = dataTransfer.files;
    //   }
    // }, []);

    useEffect(() => {
      if (currentContractId < 1) return
  
      getApprovedInvoiceDoc(currentContractId, currentDateId);
    }, [getApprovedInvoiceDoc, currentContractId, currentDateId]);

    const approvedInvoiceDocState: IApprovedInvoiceDoxState = useSelector((state: RootState) => state.approvedInvoiceDox)
    const approvedInvoiceDox: IApprovedInvoiceDoc[] = approvedInvoiceDocState.approvedInvoiceDox

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IApprovedInvoiceDoc[]>(() => approvedInvoiceDox);
    const [validationErrors, setValidationErrors] = useState<{[cellId: string]: string;}>({});
    // const [imvoiceDate, setInvoiceDate] = useState<Date | null>(null)
    const [sendDate, setSendDate] = useState<Date | null>(null)
    const [confirmDate, setConfirmDate] = useState<Date | null>(null)

    // const [fileList, setFileList] = useState<File[]>([])

    useEffect(() => {
      if(tableData !== approvedInvoiceDox){
        setTableData(approvedInvoiceDox)
      }
    }, [tableData, approvedInvoiceDox]);

    const handleCreateNewRow = (values: IApprovedInvoiceDoc) => {
        if(values.file === null){
            toastWarning("لطفا فایل را وارد کنید");
            return;
        }

        const request: IRequestApprovedInvoiceDoc = {
            contractid: values.contractid,
            dateid: values.dateid,
            invoicekind: values.invoicekind,
            invoiceno: values.invoiceno,
            invoicedate: new Date(),
            senddate: new Date(),
            confirmdate: new Date(),
            sgp_r: values.sgp_r,
            sgp_fc: values.sgp_fc,
            cgp_r: values.cgp_r,
            cgp_fc: values.cgp_r,
            description: values.description,
            file: selectedFiles[0]!,
            active: values.active,
        }

        addApprovedInvoiceDoc(request)
        selectedFiles = []
        // tableData.push(values);
        // setTableData([...tableData]);
    };

    const handleSaveRowEdits: MaterialReactTableProps<IApprovedInvoiceDoc>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(selectedFiles.length === 0 || selectedFiles[0] === null) {
          toastInfo("لطفا فایل مورد نظر را انتخاب کنید  ");
          return;
        }
        
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            approvedinvoicedoxid: row.original.approvedinvoicedoxid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            invoicekind: 0,
            invoiceno: 0,
            invoicedate: new Date(),
            senddate: new Date(),
            confirmdate: new Date(),
            sgp_r: 0,
            sgp_fc: 0,
            cgp_r: 0,
            cgp_fc: 0,
            description: '',
            file: null,
            filename: '',
            active: false
          };         
          //send/receive api updates here, then refetch or update local table data for re-render
          console.log(selectedFiles[0].name)
          console.log(row.original.filename)

          if(selectedFiles[0].name !== row.original.filename){
            const request: IRequestApprovedInvoiceDoc = {
              contractid: row.original.contractid,
              dateid: row.original.dateid,
              invoicekind: values.invoicekind,
              invoiceno: values.invoiceno,
              invoicedate: new Date(),
              senddate: new Date(),
              confirmdate: new Date(),
              sgp_r: values.sgp_r,
              sgp_fc: values.sgp_fc,
              cgp_r: values.cgp_r,
              cgp_fc: values.cgp_r,
              description: values.description,
              file: selectedFiles[0]!,
              active: values.active,
            }
            console.log('----request: ', request)
  
            editApprovedInvoiceDoc(Number(row.original.approvedinvoicedoxid), request)
          }
          else{
            const partialRequest: IRequestPartialApprovedInvoiceDoc = {
                contractid: row.original.contractid,
                dateid: row.original.dateid,
                invoicekind: values.invoicekind,
                invoiceno: values.invoiceno,
                invoicedate: new Date(),
                senddate: new Date(),
                confirmdate: new Date(),
                sgp_r: values.sgp_r,
                sgp_fc: values.sgp_fc,
                cgp_r: values.cgp_r,
                cgp_fc: values.cgp_r,
                description: values.description,
            }
            console.log('----partialRequest: ', partialRequest)

            partialEditApprovedInvoiceDoc(Number(row.original.approvedinvoicedoxid), partialRequest)
          }
          
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          selectedFiles = []
        }
    };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
      selectedFiles = []
    };
  
    const handleDeleteRow = useCallback(
        (row: MRT_Row<IApprovedInvoiceDoc>) => {
          if (
            !window.confirm(`شما از حذف این رکورد اطمینان دارید؟ `)
            // ${row.getValue('description')}
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
        //   console.log('------row.original.approvedInvoicedoxid: ', row.original.approvedInvoicedoxid)
          deleteApprovedInvoiceDoc(Number(row.original.approvedinvoicedoxid))
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        },
        [deleteApprovedInvoiceDoc, tableData],
    );

    // const getCommonEditTextFieldProps = useCallback(
    //   (
    //     cell: MRT_Cell<IApprovedInvoiceDoc>,
    //   ): MRT_ColumnDef<IApprovedInvoiceDoc>['muiTableBodyCellEditTextFieldProps'] => {
    //     return {
    //       error: !!validationErrors[cell.id],
    //       helperText: validationErrors[cell.id],
    //       onBlur: (event) => {
    //         const isValid =
    //           cell.column.id === 'approvedInvoiceDoc' ? validateRequired(event.target.value) : '';
    //         if (!isValid) {
    //           //set validation error for cell if invalid
    //           setValidationErrors({
    //             ...validationErrors,
    //             [cell.id]: `${cell.column.columnDef.header} الزامی است`,
    //           });
    //         } else {
    //           //remove validation error for cell if valid
    //           delete validationErrors[cell.id];
    //           setValidationErrors({
    //             ...validationErrors,
    //           });
    //         }
    //       },
    //     };
    //   },
    //   [validationErrors],
    // );
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        if(!target.files){
            return;
        }
        const files = target.files!;
        console.log('filename: ', files[0].name)
        const arrayFiles = Array.from(files)
        selectedFiles = arrayFiles

        // const reader = new FileReader();
    
        // reader.onloadend = () => {
        //     const arrayFiles = Array.from(files)
        //     selectedFiles = arrayFiles
        // };
    
        // reader.readAsDataURL(files[0]);
    };

    const forceDownload = (response: AxiosResponse<any> | null, filename: string) =>{
      if(!response) return

      const url = window.URL.createObjectURL(new Blob([response!.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    }

    const downloadWithAxios = (approvedInvoiceDocId: number, filename: string)=>{
      try{
        const authToken = sessionStorage.getItem("token")
        // let response: AxiosResponse<any> | null = null
        httpGenerator(authToken!)
            .get(`approvedInvoiceDox/download/${approvedInvoiceDocId}/`, { responseType: 'blob' })
            .then((response: AxiosResponse<any>) => {
              forceDownload(response, filename)
            })
      }catch(error: any){
          console.log(error);
      }
    }

    const columns = useMemo<MRT_ColumnDef<IApprovedInvoiceDoc>[]>(
        () => [
              {  
                  id: 'filename',
                  header: 'فایل',
                  muiTableHeadCellProps: {
                    align: 'center',
                  },
                  muiTableBodyCellProps: {
                    align: 'center',
                  },
                  size: 100,
                  minSize: 80,
                  maxSize: 120,
                  columnDefType: 'display', 
                  enableColumnActions: false,
                  //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
                  Cell: ({ cell }) => cell.row.original.filename,
              }, 
              {
                accessorKey: 'file', //simple recommended way to define a column
                header: "فایل",
    
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 100,
                minSize: 80,
                maxSize: 120,
                enableColumnActions: false,
                Edit: ({ cell, column, table }) => (
                    selectedFiles = selectedFiles.length !== 0 ? selectedFiles : new Array(new File([""], cell.row.original.filename)),
                    <Box display='flex' justifyContent='start'>
                        <FileInput
                            fileList = {selectedFiles} 
                            onChange={handleFileUpload}
                        />
                    </Box>
                )
              },
              {
                accessorKey: 'description', //simple recommended way to define a column
                header: "توضیحات",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 120,
                minSize: 100,
                maxSize: 150,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'string',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
              {
                accessorKey: 'cgp_r', //simple recommended way to define a column
                header: "مبلغ ناخالص تجمعی تائیدی (ریالی)",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'number',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
              {
                accessorKey: 'cgp_fc', //simple recommended way to define a column
                header: "مبلغ ناخالص تجمعی تائیدی (ارزی)",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'number',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
              {
                accessorKey: 'confirmdate', //simple recommended way to define a column
                header: "تاریخ تائید",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                Edit: ({ cell, column, table }) => 
                <AdapterJalali 
                  date={new Date(cell.row.original.confirmdate)} 
                  dateChangeHandler={(date: Date | null) => { setConfirmDate(date); }}
                  label="تاریخ تائید"
                />,
              },
              {
                accessorKey: 'sgp_r', //simple recommended way to define a column
                header: "مبلغ ناخالص تجمعی تائیدی (ریالی)",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'number',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
              {
                accessorKey: 'sgp_fc', //simple recommended way to define a column
                header: "مبلغ ناخالص تجمعی تائیدی (ارزی)",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'number',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
              {
                accessorKey: 'senddate', //simple recommended way to define a column
                header: "تاریخ ارسال به",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                Edit: ({ cell, column, table }) => 
                <AdapterJalali 
                  date={new Date(cell.row.original.confirmdate)} 
                  dateChangeHandler={(date: Date | null) => { setSendDate(date); }}
                  label="تاریخ ارسال به"
                />,
              },
              {
                accessorKey: 'invoicedate', //simple recommended way to define a column
                header: "تاریخ منتهی به",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                Edit: ({ cell, column, table }) => 
                <AdapterJalali 
                  date={new Date(cell.row.original.confirmdate)} 
                  dateChangeHandler={(date: Date | null) => { setConfirmDate(date); }}
                  label="تاریخ منتهی به"
                />,
              },
              {
                accessorKey: 'invoiceno', //simple recommended way to define a column
                header: "شماره صورت وضعیت",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 40,
                minSize: 30,
                maxSize: 50,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'number',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
              {
                accessorKey: 'invoicekind', //simple recommended way to define a column
                header: "صورت وضعیت",
                muiTableHeadCellProps: {
                  align: 'left',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 80,
                minSize: 70,
                maxSize: 90,
                enableColumnActions: false,
                muiTableBodyCellEditTextFieldProps: () => ({
                  required: true,
                  type: 'string',
                  variant: 'outlined',
                  size:'small',
                  // ...getCommonEditTextFieldProps(cell),
                }),
              },
            
            ],
        [],
    );    

    return (
      <Box sx={{direction:'ltr'}}>
        <MaterialReactTable 
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'ویرایش',
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 90,
            },
            'mrt-row-expand': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 10,
            },
            'mrt-row-numbers': {
              size: 10,
            },
          }}

          columns={columns}
          data={tableData}
          
          muiTopToolbarProps={{
            sx: {
              borderTop: '2px solid #888888', //add a border between columns
              borderRight: '1px solid #888888', //add a border between columns
              borderLeft: '1px solid #888888', //add a border between columns
            }
          }}
          muiTableHeadCellProps={{
            sx: {
              '& .Mui-TableHeadCell-Content': {
                justifyContent: 'center',
              },
              fontWeight: '550',
              fontSize: '11.8px',
              fontFamily: 'B Nazanin',
              borderTop: '2px solid #888888', //add a border between columns
              borderRight: '1px solid #888888', //add a border between columns
              borderLeft: '1px solid #888888', //add a border between columns
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              '& .Mui-TableBodyCell-Content': {
                justifyContent: 'space-between',
              },
              fontSize: '11.8px',
              fontFamily: 'B Nazanin',
              borderRight: '2px solid #e0e0e0', //add a border between columns
            },
          }}

          muiTableBodyProps={{
            sx: {
              //stripe the rows, make odd rows a darker color
              '& tr:nth-of-type(odd)': {
                backgroundColor: 'rgb(245, 245, 245, .1)',
              },
            },
          }}

          initialState={{ 
            density: 'compact', 
            columnPinning: { right: ['mrt-row-numbers'] },
            columnVisibility: { approvedInvoicedoxid: false, contractid: false, dateid: false, file: false } 
          }}
          enableRowNumbers
          enableRowOrdering={false}
          enableDensityToggle={false}
          //memoMode="cells"
          enableHiding={false}
          enablePagination={false}
          enableColumnFilters={false}
          enableFilters={false}
          enableSorting={false}
          enableStickyHeader
          muiTableContainerProps={{ sx: { maxHeight: '450px' } }}

          enableEditing
          editingMode="modal" //default 
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (

            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <IconButton
                // color="primary"
                onClick={() => //console.log('======row: ', row) 
                  downloadWithAxios(row.original.approvedinvoicedoxid, row.original.filename)
                }
              >
                <DownloadOutlined />
              </IconButton>
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
              sx={{ fontFamily:'B Nazanin'}}
            >
              ساختن رکورد جدید
            </Button>
          )}
        />
        <CreateNewAccountModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
        />
      </Box>
    );
};

interface CreateModalProps {
columns: MRT_ColumnDef<IApprovedInvoiceDoc>[];
onClose: () => void;
onSubmit: (values: IApprovedInvoiceDoc) => void;
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

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    if(!target.files){
        return;
    }
    const file = target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
        selectedFiles = Array.from(target.files!)
        setValues({ ...values, [event.target.name]: file });
    };

    reader.readAsDataURL(file);
    };

const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
};

return (
    <Dialog open={open}>
    <DialogTitle textAlign="center" sx={{fontFamily:'B Nazanin'}}>ساختن رکورد جدید</DialogTitle>
    <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
        <Stack
            sx={{
            width: '100%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
            }}
        >
            {columns.filter(column => 
                column.accessorKey === 'description').map((column) => (
            <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
                }
            />
            ))}
            {columns.filter(column => 
            column.accessorKey === 'file').map((column) => (
            <Box key={column.accessorKey} display='flex' justifyContent='start'>
                <input
                    id="upload-image"
                    accept=".txt, .pdf, .doc, .docx"
                    type="file"
                    onChange={handleFileUpload}
                />
            </Box>
            ))}
        </Stack>
        </form>
    </DialogContent>
    <DialogActions sx={{ p: '1.25rem', fontFamily:'B Nazanin' }}>
        <Button onClick={onClose}  sx={{ fontFamily:'B Nazanin' }}>انصراف</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained" sx={{ fontFamily:'B Nazanin' }}>
        ساختن رکورد جدید
        </Button>
    </DialogActions>
    </Dialog>
);
};
  
//const validateRequired = (value: string) => !!value.length;
export default ApprovedInvoiceDoc;