/* eslint-disable no-sequences */
import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_Row,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
  MRT_Cell,
} from 'material-react-table';
import {
    // Avatar,
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip,
} from '@mui/material';
import { ConnectedProps, connect, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { IZoneImage, IRequestZoneImage, IRequestPartialZoneImage } from '../../../../models/zoneImage';
import { RootState } from '../../../../redux/store/store';
import { IZoneImageState } from '../../../../redux/reducers/zoneImageReducer';
// import { toastWarning } from '../../../../services/toasters';
import { Delete, Edit } from '@mui/icons-material';
import { FileInput } from '../../../../components';
import { backendUrl } from '../../../../services';
import { 
    AddZoneImage, 
    DeleteZoneImage, 
    EditZoneImage, 
    GetZoneImage, 
    PartialEditZoneImage 
} from '../../../../redux/actionCreators/zoneImageActions';
import { start } from 'repl';


let selectedImage1: File[] = [];
let selectedImage2: File[] = [];
let selectedImage3: File[] = [];
// interface ZoneImageProps {
//     currentContractId: number, 
//     currentDateId: number,
//     getZoneImage: (contractId: number, dateid: number) => void,
//     addZoneImage: (request: IRequestZoneImage) => void,
//     editZoneImage: (id: number, request: IRequestZoneImage) => void,
//     partialEditZoneImage: (id: number, request: IRequestPartialZoneImage) => void,
//     deleteZoneImage: (id: number) => void,
// }
const ZoneImage: FC<ZoneImagesProps> = ({ 
    currentContractId, 
    currentDateId, 
    getZoneImage,
    addZoneImage,
    editZoneImage,
    partialEditZoneImage,
    deleteZoneImage,
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
  
      getZoneImage(currentContractId, currentDateId);
    }, [getZoneImage, currentContractId, currentDateId]);

    const zoneImageState: IZoneImageState = useSelector((state: RootState) => state.zoneImages)
    const zoneImages: IZoneImage[] = zoneImageState.zoneImages

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IZoneImage[]>(() => zoneImages);
    const [validationErrors, setValidationErrors] = useState<{[cellId: string]: string;}>({});

    // const [fileList, setFileList] = useState<File[]>([])

    useEffect(() => {
      if(tableData !== zoneImages){
        // console.log('useEffect run = zoneImages changed')
        // console.log('changed zoneImages: ', zoneImages)
        setTableData(zoneImages)
      }
    }, [tableData, zoneImages]);

    const handleCreateNewRow = (values: IZoneImage) => {
        // if(values.zone === ''){
        //     toastWarning("لطفا سازه را وارد کنید");
        //     return;
        // }
        console.log("values.ppp: ", values.ppp === null)
        console.log("values.app: ", values.app)
        if (!Object.keys(validationErrors).length) {
            const request: IRequestZoneImage = {
                contractid: currentContractId,
                zoneid: values.zoneid,
                dateid: currentDateId,
                zone: values.zone,
                ppp: String(values.ppp) !== '' ? values.ppp : 0,
                app: String(values.app) !== '' ? values.app : 0,
                img1: selectedImage1[0],
                description1: values.description1,
                img2: selectedImage2[0],
                description2: values.description2,
                img3: selectedImage3[0],
                description3: values.description3,
            }

            console.log('request: ', request)
            addZoneImage(request)
            selectedImage1 = []
            selectedImage2 = []
            selectedImage3 = []
            // tableData.push(values);
            // setTableData([...tableData]);
        }
    };

    const handleSaveRowEdits: MaterialReactTableProps<IZoneImage>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        // if(values.zone === ''){
        //     toastWarning("لطفا سازه را وارد کنید");
        //     return;
        // }
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            zoneimageid: row.original.zoneimageid,
            zoneid: row.original.zoneid,
            dateid: row.original.dateid,
            contract: row.original.contract,
            zone: row.original.zone,
            ppp: 0,
            app: 0,
            img1: '',
            imagepath1: '',
            description1: '',
            img2: '',
            imagepath2: '',
            description2: '',
            img3: '',
            imagepath3: '',
            description3: '',
          };         
          //send/receive api updates here, then refetch or update local table data for re-render
        //   console.log(selectedImage1[0].name)
        //   console.log(row.original.imagepath1)

        //   if(selectedImage1[0].name !== row.original.imagepath1){

            console.log('----selectedImage1[0].name: ', selectedImage1[0].name)
            console.log('----row.original.imagepath1: ', row.original.imagepath1)

            const request: IRequestZoneImage = {
                contractid: currentContractId,
                zoneid: values.zoneid,
                dateid: currentDateId,
                zone: values.zone,
                ppp: values.ppp,
                app: values.app,
                img1: (selectedImage1[0].name !== row.original.imagepath1) ? selectedImage1[0] : null,
                description1: values.description1,
                img2: (selectedImage2[0].name !== row.original.imagepath2) ? selectedImage2[0] : null,
                description2: values.description2,
                img3: (selectedImage3[0].name !== row.original.imagepath3) ? selectedImage3[0] : null,
                description3: values.description3,
    
            }
            // console.log('----request: ', request)
  
            editZoneImage(Number(row.original.zoneimageid), request)
        //   }
        //   else{
        //     const partialRequest: IRequestPartialZoneImage = {
        //         contractid: currentContractId,
        //         zoneid: values.zoneid,
        //         dateid: currentDateId,
        //         zone: values.zone,
        //         ppp: values.ppp,
        //         app: values.app,
        //         description1: values.description1,
        //         description2: values.description2,
        //         description3: values.description3,
        //     }
        //     console.log('----partialRequest: ', partialRequest)

        //     partialEditZoneImage(Number(row.original.zoneimageid), partialRequest)
        //   }
          
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          selectedImage1 = []
          selectedImage2 = []
          selectedImage3 = []
        }
    };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
      selectedImage1 = []
      selectedImage2 = []
      selectedImage3 = []
    };
  
    const handleDeleteRow = useCallback(
        (row: MRT_Row<IZoneImage>) => {
          if (
            !window.confirm(`شما از حذف این رکورد اطمینان دارید؟ `)
            // ${row.getValue('description')}
          ) {
            return;
          }
          //send api delete request here, then refetch or update local table data for re-render
        //   console.log('------row.original.zoneimageid: ', row.original.zoneimageid)
          deleteZoneImage(Number(row.original.zoneimageid))
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        },
        [deleteZoneImage, tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IZoneImage>,
      ): MRT_ColumnDef<IZoneImage>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              cell.column.id === 'zone' ? validateRequired(event.target.value) : '';
            if (!isValid) {
              //set validation error for cell if invalid
              setValidationErrors({
                ...validationErrors,
                [cell.id]: `${cell.column.columnDef.header} الزامی است`,
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
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        // console.log('handleImageUpload condition: ', !target || !target.files || !target.name)
        console.log('target: ', target)
        console.log('target.files: ', target.files)
        console.log('target.files[0].name: ', target.files && target.files?.length > 0 ? target.files[0].name : '')
        if(target.files?.length === 0){
            return;
        }
        
        const files = target.files!;
        console.log('filename: ', files[0].name)
        const arrayImages = Array.from(files)
        console.log('arrayImages: ', arrayImages)
        switch(target.name){
            case 'img1':
                selectedImage1 = arrayImages;
                break;
            case 'img2':
                selectedImage2 = arrayImages;
                break;
            case 'img3':
                selectedImage3 = arrayImages;
                break;
        }
    };

    const columns = useMemo<MRT_ColumnDef<IZoneImage>[]>(
        () => [
          {  
            id: 'imagepath1',
            header: 'عکس 1',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 80,
            minSize: 60,
            maxSize: 100,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function   cell.row.original.imagepath1
            Cell: ({ cell }) => (
                    <img src={backendUrl+cell.row.original.img1} alt='' style={{width:60, height:70}}/>
                ),
          }, 
          {
            accessorKey: 'img1', //simple recommended way to define a column
            header: "فایل",

            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => (
                selectedImage1 = selectedImage1.length !== 0 ? selectedImage1 : new Array(new File([""], cell.row.original.imagepath1)),
                <Box display='flex' justifyContent='start'>
                    <FileInput
                        name = "img1"
                        fileList = {selectedImage1} 
                        onChange={handleImageUpload}
                    />
                </Box>
            )
          },
          {
            accessorKey: 'description1', //simple recommended way to define a column
            header: 'توضیحات عکس 1',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 110,
            minSize: 100,
            maxSize: 120,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
                required: false,
                type: 'string',
                variant: 'outlined',
                size:'small',
                // ...getCommonEditTextFieldProps(cell),
              }),
          },
          {  
            id: 'imagepath2',
            header: 'عکس 2',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 80,
            minSize: 60,
            maxSize: 100,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => (
                <img src={backendUrl+cell.row.original.img2} alt='' style={{width:60, height:70}}/>
                )
          }, 
          {
            accessorKey: 'img2', //simple recommended way to define a column
            header: "فایل",

            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => (
                selectedImage2 = selectedImage2.length !== 0 ? selectedImage2 : new Array(new File([""], cell.row.original.imagepath2)),
                <Box display='flex' justifyContent='start'>
                    <FileInput
                        name = "img2"
                        fileList = {selectedImage2} 
                        onChange={handleImageUpload}
                    />
                </Box>
            )
          },
          {
            accessorKey: 'description2', //simple recommended way to define a column
            header: 'توضیحات عکس 2',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 110,
            minSize: 100,
            maxSize: 120,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
                required: false,
                type: 'string',
                variant: 'outlined',
                size:'small',
                // ...getCommonEditTextFieldProps(cell),
              }),
          },
          {  
            id: 'imagepath3',
            header: 'عکس 3',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 80,
            minSize: 60,
            maxSize: 100,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => (
                <img src={backendUrl+cell.row.original.img3} alt='' style={{width:60, height:70}}/>
                )
          }, 
          {
            accessorKey: 'img3', //simple recommended way to define a column
            header: "فایل",

            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => (
                selectedImage3 = selectedImage3.length !== 0 ? selectedImage3 : new Array(new File([""], cell.row.original.imagepath3)),
                <Box display='flex' justifyContent='start'>
                    <FileInput
                        name = "img3"
                        fileList = {selectedImage3} 
                        onChange={handleImageUpload}
                    />
                </Box>
            )
          },
          {
            accessorKey: 'description3', //simple recommended way to define a column
            header: 'توضیحات عکس 3',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 110,
            minSize: 100,
            maxSize: 120,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
                required: false,
                type: 'string',
                variant: 'outlined',
                size:'small',
                // ...getCommonEditTextFieldProps(cell),
              }),
          },          
          
          {
            accessorKey: 'app', //simple recommended way to define a column
            header: 'درصد پیشرفت واقعی پروژه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 45,
            minSize: 40,
            maxSize: 50,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
                required: false,
                type: 'number',
                variant: 'outlined',
                size:'small',
                // ...getCommonEditTextFieldProps(cell),
              }),
          },
          {
            accessorKey: 'ppp', //simple recommended way to define a column
            header: 'درصد پیشرفت برنامه ای',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 45,
            minSize: 40,
            maxSize: 50,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
                required: false,
                type: 'number',
                variant: 'outlined',
                size:'small',
                // ...getCommonEditTextFieldProps(cell),
              }),
          },
          {  
            accessorKey: 'zone',
            header: 'سازه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 45,
            minSize: 40,
            maxSize: 50,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                required: true,
                type: 'string',
                variant: 'outlined',
                size:'small',
                ...getCommonEditTextFieldProps(cell),
              }),
            },       
        ],
        [getCommonEditTextFieldProps],
    );    
        
    // console.log('****zoneImages: ', zoneImages)

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
            columnVisibility: { zoneimageid: false, zoneid: false, dateid: false, img1: false, img2: false, img3: false } 
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
    columns: MRT_ColumnDef<IZoneImage>[];
    onClose: () => void;
    onSubmit: (values: IZoneImage) => void;
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
    // const reader = new FileReader();

    // reader.onloadend = () => {
        switch(target.name){
            case 'img1':
                selectedImage1 = Array.from(target.files!);
                break;
            case 'img2':
                selectedImage2 = Array.from(target.files!);
                break;
            case 'img3':
                selectedImage3 = Array.from(target.files!);
                break;
        }
        
        setValues({ ...values, [event.target.name]: file });
    // };

    // reader.readAsDataURL(file);
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
            {
            columns
            .filter(column => 
                column.accessorKey === 'zone')
            .map((column) => (
                (column.accessorKey === 'zone') 
                    ?
                    <TextField
                        key={column.accessorKey}
                        label={column.header}
                        name={column.accessorKey}
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                    :
                    ''  
                ))              
            }
            {columns
            .filter(column => 
                column.accessorKey === 'app' ||
                column.accessorKey === 'ppp' ||
                column.accessorKey === 'description1' ||
                column.accessorKey === 'description2' || 
                column.accessorKey === 'description3' ||
                column.accessorKey === 'img1' ||
                column.accessorKey === 'img2' ||
                column.accessorKey === 'img3')
            .map((column) => (
                (column.accessorKey === 'zone') 
                    ?
                    <TextField
                        key={column.accessorKey}
                        label={column.header}
                        name={column.accessorKey}
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                    :
                (column.accessorKey === 'ppp' ||
                column.accessorKey === 'app') 
                    ?
                    <TextField
                        key={column.accessorKey}
                        type="number"
                        label={column.header}
                        name={column.accessorKey}
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value !== null ? e.target.value : 0})
                            // setValue(parseFloat(e.target.value).toFixed(1))
                        }
                    />
                    :
                    (column.accessorKey === 'description1' ||
                    column.accessorKey === 'description2' || 
                    column.accessorKey === 'description3') 
                        ?
                        <TextField
                            key={column.accessorKey}
                            label={column.header}
                            name={column.accessorKey}
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                                // setValue(parseFloat(e.target.value).toFixed(1))
                              }
                        />
                        :
                        (column.accessorKey === 'img1' ||
                        column.accessorKey === 'img2' ||
                        column.accessorKey === 'img3')
                            ?
                            (<Box key={column.accessorKey} display='flex' justifyContent='start'>
                                <input
                                    id="upload-image"
                                    name={column.accessorKey}
                                    accept=".jpg, .jpeg, .png, .bmp"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                            </Box>)
                            :
                            ''
                    ))
            }
            {/* {columns.filter(column => 
                column.accessorKey === 'description1' ||
                column.accessorKey === 'description2' || 
                column.accessorKey === 'description3').map((column) => (
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
                column.accessorKey === 'img1' ||
                column.accessorKey === 'img2' ||
                column.accessorKey === 'img3').map((column) => (
            <Box key={column.accessorKey} display='flex' justifyContent='start'>
                <input
                    id="upload-image"
                    name={column.accessorKey}
                    accept=".jpg, .png, .bmp"
                    type="file"
                    onChange={handleFileUpload}
                />
            </Box>
            ))} */}
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
  
const validateRequired = (value: string) => !!value.length;

const mapStateToProps = (state: RootState) => ({
    currentContractId: state.contracts.currentContractId,
    currentDateId: state.reportDates.currentReportDateId
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getZoneImage: (contractId: number, dateid: number) => 
      dispatch(GetZoneImage(contractId, dateid)),
    addZoneImage: (request: IRequestZoneImage) => 
      dispatch(AddZoneImage(request)),
    editZoneImage: (id: number, request: IRequestZoneImage) => 
      dispatch(EditZoneImage(id, request)),
    partialEditZoneImage: (id: number, request: IRequestPartialZoneImage) => 
      dispatch(PartialEditZoneImage(id, request)),
    deleteZoneImage: (id: number) => 
      dispatch(DeleteZoneImage(id)),
    });
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type ZoneImagesProps = ConnectedProps<typeof connector>;

  export default connector(ZoneImage)