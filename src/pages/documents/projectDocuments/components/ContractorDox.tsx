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
import { IContractorDoc, IRequestContractorDoc, IRequestPartialContractorDoc } from '../../../../models/contractorDox';
import { RootState } from '../../../../redux/store/store';
import { IContractorDoxState } from '../../../../redux/reducers/contractorDoxReducer';
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
interface ContractorDocProps {
    currentContractId: number, 
    currentDateId: number,
    getContractorDoc: (contractId: number) => void,
    addContractorDoc: (request: IRequestContractorDoc) => void,
    editContractorDoc: (id: number, request: IRequestContractorDoc) => void,
    partialEditContractorDoc: (id: number, request: IRequestPartialContractorDoc) => void,
    deleteContractorDoc: (id: number) => void,
}
const ContractorDoc: FC<ContractorDocProps> = ({ 
    currentContractId, 
    currentDateId, 
    getContractorDoc,
    addContractorDoc,
    editContractorDoc,
    partialEditContractorDoc,
    deleteContractorDoc,
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
  
      getContractorDoc(currentContractId);
    }, [getContractorDoc, currentContractId]);

    const contractorDocState: IContractorDoxState = useSelector((state: RootState) => state.contractorDox)
    const contractorDox: IContractorDoc[] = contractorDocState.contractorDox

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IContractorDoc[]>(() => contractorDox);
    const [validationErrors, setValidationErrors] = useState<{[cellId: string]: string;}>({});
    const [contractDate, setContractDate] = useState<Date | null>(null)

    // const [fileList, setFileList] = useState<File[]>([])

    useEffect(() => {
      if(tableData !== contractorDox){
        setTableData(contractorDox)
      }
    }, [tableData, contractorDox]);

    const handleCreateNewRow = (values: IContractorDoc) => {
        if(values.contracttitle === ''){
            toastWarning("لطفا عنوان قرارداد الحاقیه را وارد کنید");
            return;
        }
        if(values.contractor === ''){
            toastWarning("لطفا طرف قرارداد الحاقیه را وارد کنید");
            return;
        }
        if(values.file === null){
            toastWarning("لطفا فایل را وارد کنید");
            return;
        }

        const request: IRequestContractorDoc = {
            contractid: currentContractId,
            contractdate: values.contractdate,
            contracttitle: values.contracttitle,
            contractor: values.contractor,
            contractno: values.contractno,
            riderno: values.riderno,
            file: selectedFiles[0],
        }

        addContractorDoc(request)
        selectedFiles = []
        // tableData.push(values);
        // setTableData([...tableData]);
    };

    const handleSaveRowEdits: MaterialReactTableProps<IContractorDoc>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(selectedFiles.length === 0 || selectedFiles[0] === null) {
          toastInfo("لطفا فایل مورد نظر را انتخاب کنید  ");
          return;
        }
        if(values.contracttitle === ''){
            toastWarning("لطفا عنوان قرارداد الحاقیه را وارد کنید");
            return;
        }
        if(values.contractor === ''){
            toastWarning("لطفا طرف قرارداد الحاقیه را وارد کنید");
            return;
        }
        
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            contractordoxid: row.original.contractordoxid,
            contractid: row.original.contractid,
            contractshamsidate: '',
            contractdate: new Date(),
            contracttitle: '',
            contractor: '',
            contractno: '',
            riderno: 0,
            file: null,
            filename: '',
          };         
          //send/receive api updates here, then refetch or update local table data for re-render
          console.log(selectedFiles[0].name)
          console.log(row.original.filename)

          if(selectedFiles[0].name !== row.original.filename){
            const request: IRequestContractorDoc = {
              contractid: row.original.contractid,
              contractdate: values.contractdate,
              contracttitle: values.contracttitle,
              contractor: values.contractor,
              contractno: values.contractNo,
              riderno: values.riderno,
              file: selectedFiles[0]!,
            }
            console.log('----request: ', request)
  
            editContractorDoc(Number(row.original.contractordoxid), request)
          }
          else{
            const partialRequest: IRequestPartialContractorDoc = {
              contractid: row.original.contractid,
              contractdate: values.contractdate,
              contracttitle: values.contracttitle,
              contractor: values.contractor,
              contractno: values.contractNo,
              riderno: values.riderno,
            }
            console.log('----partialRequest: ', partialRequest)

            partialEditContractorDoc(Number(row.original.contractordoxid), partialRequest)
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
        (row: MRT_Row<IContractorDoc>) => {
          if (
            !window.confirm(`شما از حذف این رکورد اطمینان دارید؟ `)
            // ${row.getValue('description')}
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
        //   console.log('------row.original.contractordoxid: ', row.original.contractordoxid)
          deleteContractorDoc(Number(row.original.contractordoxid))
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        },
        [deleteContractorDoc, tableData],
    );

    // const getCommonEditTextFieldProps = useCallback(
    //   (
    //     cell: MRT_Cell<IContractorDoc>,
    //   ): MRT_ColumnDef<IContractorDoc>['muiTableBodyCellEditTextFieldProps'] => {
    //     return {
    //       error: !!validationErrors[cell.id],
    //       helperText: validationErrors[cell.id],
    //       onBlur: (event) => {
    //         const isValid =
    //           cell.column.id === 'contractorDoc' ? validateRequired(event.target.value) : '';
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

    const downloadWithAxios = (contractorDocId: number, filename: string)=>{
      try{
        const authToken = sessionStorage.getItem("token")
        // let response: AxiosResponse<any> | null = null
        httpGenerator(authToken!)
            .get(`contractorDox/download/${contractorDocId}/`, { responseType: 'blob' })
            .then((response: AxiosResponse<any>) => {
              forceDownload(response, filename)
            })
      }catch(error: any){
          console.log(error);
      }
    }

    const columns = useMemo<MRT_ColumnDef<IContractorDoc>[]>(
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
            size: 200,
            minSize: 100,
            maxSize: 250,
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
            size: 200,
            minSize: 100,
            maxSize: 250,
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
            accessorKey: 'riderno', //simple recommended way to define a column
            header: 'شماره الحاقیه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
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
            accessorKey: 'contractshamsidate', //simple recommended way to define a column
            header: 'تاریخ عقد قرارداد الحاقیه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.contractdate)} 
                dateChangeHandler={(date: Date | null) => { setContractDate(date); }}
                label='تاریخ عقد قرارداد الحاقیه'
              />,
          },  
          {
            accessorKey: 'contractno', //simple recommended way to define a column
            header: 'شماره قرارداد الحاقیه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
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
            accessorKey: 'contractor', //simple recommended way to define a column
            header: 'طرف قرارداد الحاقیه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
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
            accessorKey: 'contracttitle', //simple recommended way to define a column
            header: 'عنوان قرارداد الحاقیه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
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
            columnVisibility: { contractordoxid: false, contractid: false, dateid: false, file: false } 
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
                  downloadWithAxios(row.original.contractordoxid, row.original.filename)
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
columns: MRT_ColumnDef<IContractorDoc>[];
onClose: () => void;
onSubmit: (values: IContractorDoc) => void;
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
                column.accessorKey === 'contracttitle' ||
                column.accessorKey === 'contractor' || 
                column.accessorKey === 'contractno' ||
                column.accessorKey === 'riderno').map((column) => (
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
                column.accessorKey === 'contractdate').map((column) => (
                <AdapterJalali 
                    key={column.accessorKey}
                    label={column.header}
                    date={new Date()} 
                    dateChangeHandler={(date: Date | null) => { setValues({ ...values, ['contractdate']: date }) }}
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
export default ContractorDoc;