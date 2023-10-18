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
import { IProjectDoc, IRequestProjectDoc, IRequestPartialProjectDoc } from '../../../../models/projectDox';
import { RootState } from '../../../../redux/store/store';
import { IProjectDoxState } from '../../../../redux/reducers/projectDoxReducer';
import { toastWarning } from '../../../../services/toasters';
import { Delete, Edit, DownloadOutlined } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import { httpGenerator } from '../../../../services';
import { FileInput } from '../../../../components';


let selectedFiles: File[] = [];
// export type FileInputProps = {
//   fileList: File[];
//   onChange(fileList: FileList): void;
// };
interface ProjectDocProps {
    currentContractId: number, 
    currentDateId: number,
    getProjectDoc: (contractId: number) => void,
    addProjectDoc: (request: IRequestProjectDoc) => void,
    editProjectDoc: (id: number, request: IRequestProjectDoc) => void,
    partialEditProjectDoc: (id: number, request: IRequestPartialProjectDoc) => void,
    deleteProjectDoc: (id: number) => void,
}
const ProjectDoc: FC<ProjectDocProps> = ({ 
    currentContractId, 
    currentDateId, 
    getProjectDoc,
    addProjectDoc,
    editProjectDoc,
    partialEditProjectDoc,
    deleteProjectDoc,
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
  
      getProjectDoc(currentContractId);
    }, [getProjectDoc, currentContractId]);

    const projectDocState: IProjectDoxState = useSelector((state: RootState) => state.projectDox)
    const projectDox: IProjectDoc[] = projectDocState.projectDox

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IProjectDoc[]>(() => projectDox);
    const [validationErrors, setValidationErrors] = useState<{[cellId: string]: string;}>({});

    // const [fileList, setFileList] = useState<File[]>([])

    useEffect(() => {
      if(tableData !== projectDox){
        setTableData(projectDox)
      }
    }, [tableData, projectDox]);

    const handleCreateNewRow = (values: IProjectDoc) => {
        if(values.file === null){
            toastWarning("لطفا فایل را وارد کنید");
            return;
        }

        const request: IRequestProjectDoc = {
            contractid: currentContractId,
            dateid: currentDateId,
            doctitle: values.doctitle,
            dockind: values.dockind,
            docno: values.docno,
            file: selectedFiles[0],
            active: true,
        }

        addProjectDoc(request)
        selectedFiles = []
        // tableData.push(values);
        // setTableData([...tableData]);
    };

    const handleSaveRowEdits: MaterialReactTableProps<IProjectDoc>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(selectedFiles.length === 0 || selectedFiles[0] === null) {
          toastWarning("لطفا فایل مورد نظر را انتخاب کنید  ");
          return;
        }
        
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            projectdoxid: row.original.projectdoxid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            doctitle: 0,
            dockind: 0,
            docno: 0,
            file: null,
            filename: '',
            active: false
          };         
          //send/receive api updates here, then refetch or update local table data for re-render
          console.log(selectedFiles[0].name)
          console.log(row.original.filename)

          if(selectedFiles[0].name !== row.original.filename){
            const request: IRequestProjectDoc = {
              contractid: row.original.contractid,
              dateid: row.original.dateid,
              doctitle: values.doctitle,
              dockind: values.dockind,
              docno: values.docNo,
              file: selectedFiles[0]!,
              active: values.active,
            }
            console.log('----request: ', request)
  
            editProjectDoc(Number(row.original.projectdoxid), request)
          }
          else{
            const partialRequest: IRequestPartialProjectDoc = {
              contractid: row.original.contractid,
              dateid: row.original.dateid,
              doctitle: values.doctitle,
              dockind: values.dockind,
              docno: values.docNo,
            }
            console.log('----partialRequest: ', partialRequest)

            partialEditProjectDoc(Number(row.original.projectdoxid), partialRequest)
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
        (row: MRT_Row<IProjectDoc>) => {
          if (
            !window.confirm(`شما از حذف این رکورد اطمینان دارید؟ `)
            // ${row.getValue('description')}
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
        //   console.log('------row.original.projectdoxid: ', row.original.projectdoxid)
          deleteProjectDoc(Number(row.original.projectdoxid))
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        },
        [deleteProjectDoc, tableData],
    );

    // const getCommonEditTextFieldProps = useCallback(
    //   (
    //     cell: MRT_Cell<IProjectDoc>,
    //   ): MRT_ColumnDef<IProjectDoc>['muiTableBodyCellEditTextFieldProps'] => {
    //     return {
    //       error: !!validationErrors[cell.id],
    //       helperText: validationErrors[cell.id],
    //       onBlur: (event) => {
    //         const isValid =
    //           cell.column.id === 'projectDoc' ? validateRequired(event.target.value) : '';
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

    const downloadWithAxios = (projectDocId: number, filename: string)=>{
      try{
        const authToken = sessionStorage.getItem("token")
        // let response: AxiosResponse<any> | null = null
        httpGenerator(authToken!)
            .get(`projectDox/download/${projectDocId}/`, { responseType: 'blob' })
            .then((response: AxiosResponse<any>) => {
              forceDownload(response, filename)
            })
      }catch(error: any){
          console.log(error);
      }
    }

    const columns = useMemo<MRT_ColumnDef<IProjectDoc>[]>(
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
            accessorKey: 'docno', //simple recommended way to define a column
            header: 'شماره',
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
            accessorKey: 'dockind', //simple recommended way to define a column
            header: 'نوع',
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
            accessorKey: 'doctitle', //simple recommended way to define a column6
            header: 'عنوان سند',
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
            columnVisibility: { projectdoxid: false, contractid: false, dateid: false, file: false } 
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
                  downloadWithAxios(row.original.projectdoxid, row.original.filename)
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
columns: MRT_ColumnDef<IProjectDoc>[];
onClose: () => void;
onSubmit: (values: IProjectDoc) => void;
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
                column.accessorKey === 'doctitle' ||
                column.accessorKey === 'dockind' || 
                column.accessorKey === 'docno').map((column) => (
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
export default ProjectDoc;