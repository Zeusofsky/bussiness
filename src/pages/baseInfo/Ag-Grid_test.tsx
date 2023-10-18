// 'use strict';

// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// // import { AgGridReact } from 'ag-grid-react';
// import { AgGridReact } from '@ag-grid-community/react';
// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-alpine.css';
// import './styles.css';
// import { RowSelectedEvent } from '@ag-grid-community/core';

// interface ICar {
//     make: string;
//     model: string;
//     price: number;
// }

// const GridExample = () => {
//     const gridRef = useRef<AgGridReact<ICar>>(null);
//       const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
//   const [rowData, setRowData] = useState<ICar[]>([
//     { make: 'Toyota', model: 'Celica', price: 35000 },
//     { make: 'Ford', model: 'Mondeo', price: 32000 },
//     { make: 'Porsche', model: 'Boxster', price: 72000 },
//   ]);
//   const [columnDefs, setColumnDefs] = useState([
//     { headerName: 'Make', field: 'make' },
//     { headerName: 'Model', field: 'model' },
//     {
//       headerName: 'Price',
//       field: 'price',
//       valueFormatter: (params) => {
//         // params.value: number
//         return '£' + params.value;
//       },
//     },
//   ]);
//   const context = useMemo(() => {
//     return {
//       discount: 0.9,
//     };
//   }, []);
//   const getRowId = useMemo(() => {
//     return (params) => {
//       // params.data : ICar
//       return params.data.make + params.data.model;
//     };
//   }, []);

//   const onRowSelected = useCallback((event: RowSelectedEvent<ICar>) => {
//     // event.data: ICar | undefined
//     if (event.data && event.node.isSelected()) {
//       const price = event.data.price;
//       // event.context: IContext
//       const discountRate = event.context.discount;
//       console.log('Price with 10% discount:', price * discountRate);
//     }
//   }, []);

//   const onShowSelection = useCallback(() => {
//     // api.getSelectedRows() : ICar[]
//     const cars = gridRef.current!.api.getSelectedRows();
//     console.log(
//       'Selected cars are',
//       cars.map((c) => `${c.make} ${c.model}`)
//     );
//   }, []);

//   return (
//     <div style={containerStyle}>
//       <div className="test-container">
//         <div className="test-header">
//           <button onClick={onShowSelection}>Log Selected Cars</button>
//         </div>

//         <div style={gridStyle} className="ag-theme-alpine">
//           {/* <AgGridReact
//             ref={gridRef}
//             rowData={rowData}
//             columnDefs={columnDefs}
//             rowSelection={'multiple'}
//             context={context}
//             getRowId={getRowId}
//             onRowSelected={onRowSelected}
//           /> */}
//           <AgGridReact<ICar>
//             ref={gridRef}
//             rowData={rowData}
//             onRowSelected={onRowSelected}
//         >
//         </AgGridReact>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GridExample;
