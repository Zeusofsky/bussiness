import { 
    Paper, 
    styled, 
    Table, 
    TableBody, 
    TableCell, 
    tableCellClasses, 
    TableContainer, 
    TableHead, 
    TableRow 
  } from "@mui/material";
  import moment from "moment";

  /* mui DataTable Styles */
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: '#f5f5f5',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      color: 'inherit',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
    
  /** Helpers */
  
  // helper to get an array containing the object values with
  // the correct type infered.
  function objectValues<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
  }
  
  function objectKeys<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => objKey as keyof T);
  }
  
  type PrimitiveType = string | Symbol | number | boolean;
  
  // Type guard for the primitive types which will support printing
  // out of the box
  function isPrimitive(value: any): value is PrimitiveType {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "symbol"
    );
  }
  
  /** Component */
  
  interface MinTableItem {
    id: PrimitiveType;
  }
  
  type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;
  
  type CustomRenderers<T extends MinTableItem> = Partial<
    Record<keyof T, (it: T) => React.ReactNode>
  >;
  
  interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    customRenderers?: CustomRenderers<T>;
  }
  
  export const GenericDataTable = <T extends MinTableItem>(props: TableProps<T>) => {
    function renderRow(item: T): React.ReactNode {
      return (
        <StyledTableRow key={item.id.toString()}>
          {objectKeys(item).map((itemProperty, indx) => {
            // console.log('itemProperty: ', itemProperty)
            const customRenderer = props.customRenderers?.[itemProperty];

            if (customRenderer) {
              return(
                //scope="row"
                <StyledTableCell key={indx} sx={{maxWidth:80, px:1}} align="center" component="th" >
                  {customRenderer(item)}
                </StyledTableCell>
              );
            }
  
            let value:any = isPrimitive(item[itemProperty]) ?
             item[itemProperty] : 
             ""

            if(moment(value, moment.ISO_8601, true).isValid())
            {
              value = moment(value).format("YYYY-MM-DD")
            }

            return (
              itemProperty !== "id" ?
              <StyledTableCell key={indx} sx={{maxWidth:150}} align="center" component="th" scope="row">
                {value}
              </StyledTableCell>
              :''
            );
          })}
        </StyledTableRow>
      );
    }
  
    return (
        <TableContainer component={Paper} sx={{width:'90%'}}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                    <TableRow key={0}> 
                        {objectValues(props.headers).map((headerValue, index) => (
                          headerValue !== "Id" ?
                            <StyledTableCell key={index} align="center">{headerValue}</StyledTableCell>
                          :''
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map(renderRow)}
                </TableBody>
            </Table>
        </TableContainer>
    );
  }
  
  // export default GenericDataTable;