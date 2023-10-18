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
import { IHseReportDoc, IRequestHseReportDoc, IRequestPartialHseReportDoc } from '../../../../models/hseReportDox';
import { RootState } from '../../../../redux/store/store';
import { IHseReportDoxState } from '../../../../redux/reducers/hseReportDocReducer';
import { toastInfo, toastWarning } from '../../../../services/toasters';
import { Delete, Edit, DownloadOutlined } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import { httpGenerator } from '../../../../services';
import { FileInput } from '../../../../components';


let selectedFiles: File[] = [];
// export type FileInputProps = {
//   fileList: File[];
//   onChange(fileList: FileList): void;
// };
interface HseReportDocProps {
    currentContractId: number, 
    currentDateId: number,
    getHseReportDoc: (contractId: number) => void,
    addHseReportDoc: (request: IRequestHseReportDoc) => void,
    editHseReportDoc: (id: number, request: IRequestHseReportDoc) => void,
    partialEditHseReportDoc: (id: number, request: IRequestPartialHseReportDoc) => void,
    deleteHseReportDoc: (id: number) => void,
}
const HseReportDoc: FC<HseReportDocProps> = ({ 
    currentContractId, 
    currentDateId, 
    getHseReportDoc,
    addHseReportDoc,
    editHseReportDoc,
    partialEditHseReportDoc,
    deleteHseReportDoc,
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
  
      getHseReportDoc(currentContractId);
    }, [getHseReportDoc, currentContractId]);

    const hseReportDocState: IHseReportDoxState = useSelector((state: RootState) => state.hseReportDox)
    const hseReportDox: IHseReportDoc[] = hseReportDocState.hseReportDox

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IHseReportDoc[]>(() => hseReportDox);
    const [validationErrors, setValidationErrors] = useState<{[cellId: string]: string;}>({});
    // const [fileList, setFileList] = useState<File[]>([])

    useEffect(() => {
      if(tableData !== hseReportDox){
        setTableData(hseReportDox)
      }
    }, [tableData, hseReportDox]);

    const handleCreateNewRow = (values: IHseReportDoc) => {
        if(values.description === ''){
            toastWarning("لطفا توضیحات فایل را وارد کنید");
            return;
        }
        if(values.file === null){
            toastWarning("لطفا فایل را وارد کنید");
            return;
        }

        const request: IRequestHseReportDoc = {
            contractid: currentContractId,
            dateid: currentDateId,
            description: values.description,
            file: selectedFiles[0],
            active: true,
        }

        addHseReportDoc(request)
        selectedFiles = []
        // tableData.push(values);
        // setTableData([...tableData]);
    };

    const handleSaveRowEdits: MaterialReactTableProps<IHseReportDoc>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(selectedFiles.length === 0 || selectedFiles[0] === null) {
          toastInfo("لطفا فایل مورد نظر را انتخاب کنید  ");
          return;
        }
        if(values.description === '') {
          toastInfo("لطفا توضیحات فایل را وارد کنید  ");
          return;
        }
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            hsereportdoxid: row.original.hsereportdoxid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            year: row.original.year,
            month: row.original.month,
            description: '',
            file: null,
            filename: '',
            active: false
          };         
          //send/receive api updates here, then refetch or update local table data for re-render
          console.log(selectedFiles[0].name)
          console.log(row.original.filename)

          if(selectedFiles[0].name !== row.original.filename){
            const request: IRequestHseReportDoc = {
              contractid: row.original.contractid,
              dateid: row.original.dateid,
              description: values.description,
              file: selectedFiles[0]!,
              active: values.active,
            }
            // console.log('----request: ', request)
  
            editHseReportDoc(Number(row.original.hsereportdoxid), request)
          }
          else{
            const partialRequest: IRequestPartialHseReportDoc = {
              contractid: row.original.contractid,
              dateid: row.original.dateid,
              description: values.description,
            }
            // console.log('----partialRequest: ', partialRequest)

            partialEditHseReportDoc(Number(row.original.hsereportdoxid), partialRequest)
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
        (row: MRT_Row<IHseReportDoc>) => {
          if (
            !window.confirm(`شما از حذف این رکورد اطمینان دارید؟ `)
            // ${row.getValue('description')}
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
        //   console.log('------row.original.hsereportdoxid: ', row.original.hsereportdoxid)
          deleteHseReportDoc(Number(row.original.hsereportdoxid))
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        },
        [deleteHseReportDoc, tableData],
    );

    // const getCommonEditTextFieldProps = useCallback(
    //   (
    //     cell: MRT_Cell<IHseReportDoc>,
    //   ): MRT_ColumnDef<IHseReportDoc>['muiTableBodyCellEditTextFieldProps'] => {
    //     return {
    //       error: !!validationErrors[cell.id],
    //       helperText: validationErrors[cell.id],
    //       onBlur: (event) => {
    //         const isValid =
    //           cell.column.id === 'hseReportDoc' ? validateRequired(event.target.value) : '';
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

    const downloadWithAxios = (hseReportDocId: number, filename: string)=>{
      try{
        const authToken = sessionStorage.getItem("token")
        // let response: AxiosResponse<any> | null = null
        httpGenerator(authToken!)
            .get(`hseReportDox/download/${hseReportDocId}/`, { responseType: 'blob' })
            .then((response: AxiosResponse<any>) => {
              forceDownload(response, filename)
            })
      }catch(error: any){
          console.log(error);
      }
    }

    const columns = useMemo<MRT_ColumnDef<IHseReportDoc>[]>(
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
              // eslint-disable-next-line no-sequences
              selectedFiles = selectedFiles.length !== 0 ? selectedFiles : new Array(new File([""], cell.row.original.filename)),
              // console.log('=====================Edit======================='),
              // console.log('-------- ', selectedFiles.length, ', ', selectedFiles),
              // console.log('================================================'),
              //   <Button
            //     variant="contained"
            //     component="label"
            //   >
            //     ارسال فایل
            //     <input
            //         type="file"
            //         name="file"
            //         hidden
            //         //   value={cell.row.original.file}
            //         onChange={handleFileUpload}
            //     />
            //    </Button>
            <Box display='flex' justifyContent='start'>
                {/* <label htmlFor="upload-image" style={{marginLeft:5, marginRight:5}}>
                    ارسال فایل
                </label> */}
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
            size: 300,
            minSize: 200,
            maxSize: 350,
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
            id: 'year',
            header: 'سال',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 40,
            minSize: 30,
            maxSize: 50,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => cell.row.original.year,
          },
          {  
            id: 'month',
            header: 'ماه منتهی به',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 30,
            minSize: 25,
            maxSize: 40,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => cell.row.original.month,
          } 
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
            columnVisibility: { hsereportdoxid: false, contractid: false, dateid: false, file: false } 
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
                  downloadWithAxios(row.original.hsereportdoxid, row.original.filename)
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
columns: MRT_ColumnDef<IHseReportDoc>[];
onClose: () => void;
onSubmit: (values: IHseReportDoc) => void;
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
            // <TextField
            //   key={column.accessorKey}
            //   label={column.header}
            //   name={column.accessorKey}
            //   onChange={(e) =>
            //     setValues({ ...values, [e.target.name]: e.target.value })
            //   }
            // />
            // <Button
            //     key={column.accessorKey}
            //     variant="contained"
            //     component="label"
            //     >
            //     ارسال فایل
                // <input
                //     type="file"
                //     name="file"
                //     hidden
                //     onChange={handleFileUpload}
                // />
            // </Button>
            <Box key={column.accessorKey} display='flex' justifyContent='start'>
                {/* <label htmlFor="upload-image" style={{marginLeft:5, marginRight:5}}>
                    ارسال فایل
                </label> */}
                <input
                    id="upload-image"
                    // hidden
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
export default HseReportDoc;