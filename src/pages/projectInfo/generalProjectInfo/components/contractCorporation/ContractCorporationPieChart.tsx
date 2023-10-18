import { FC, ReactElement } from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
// import { Box, } from '@mui/material';
import { ICorporationItem } from '../../../../../models/contractCorporation';
import { Box, Typography } from '@mui/material';

 
const pieParams = { height: 100, width: 450, };
  
interface ContractCorporationPieChartProps {
    corporationItems: ICorporationItem[],
    title: string,
}
const ContractCorporationPieChart: FC<ContractCorporationPieChartProps> = ({corporationItems, title}): ReactElement => {
    const data = corporationItems;
    // console.log('data: ', data) 
    return(
        <Box display='flex' my={.2} py={0} mx={0.2} justifyContent='space-between' alignItems='center' border={1} borderColor='rgb(0, 0, 0, .2)' borderRadius={3}>
            <Typography mx={6} variant="subtitle1" textAlign='center' fontFamily='cursive' fontStyle='italic' fontWeight={700} >{title}</Typography>
            <PieChart
                colors={[
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)',
                ]}
                // borderColor={[
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                // ]}
                series={[
                    {
                        // arcLabel: (item) => `${item.label}`,
                        // arcLabelMinAngle: 45,
                        innerRadius: 0,
                        outerRadius: 75,
                        paddingAngle: 0,
                        cornerRadius: 0,
                        startAngle: -180,
                        endAngle: 180,
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                ]}
                margin={{ top: 15, bottom: 15, left: -50, right:50 }}
                legend={{
                  direction: "column",
                  position: {
                    vertical: "top",
                    horizontal: "right"
                  },
                }}

                sx={{
                    // [`& .${pieArcLabelClasses.root}`]: {
                    //     fill: 'white',
                    //     fontWeight: 'bold',
                    //     fontSize: 7,
                    //     borderWidth: 1,
                    //   paddingTop: 0,
                    //   paddingBottom: 0,
                    //   marginTop: 0,
                    //   marginBottom: 0,
                    // },
                    "--ChartsLegend-rootOffsetX": "-30px",
                    "--ChartsLegend-rootOffsetY": "40px",
 
                    [`& .${pieArcClasses.faded}`]: {
                        fill: 'gray',
                        },
                    }}
                {...pieParams}
            />
        </Box>
    )
}

export default ContractCorporationPieChart



// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { PieChart } from '@mui/x-charts/PieChart';

// const pieParams = { height: 200, margin: { right: 5 } };
// const palette = ['red', 'blue', 'green'];

// export default function PieColor() {
//   return (
//     <Stack direction="row" width="100%" textAlign="center" spacing={2}>
//       <Box flexGrow={1}>
//         <Typography>Default</Typography>
//         <PieChart
//           series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
//           {...pieParams}
//         />
//       </Box>
//       <Box flexGrow={1}>
//         <Typography>Palette</Typography>
//         <PieChart
//           colors={palette}
//           series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
//           {...pieParams}
//         />
//       </Box>
//       <Box flexGrow={1}>
//         <Typography>Item</Typography>
//         <PieChart
//           series={[
//             { data: [{ value: 10, color: 'orange' }, { value: 15 }, { value: 20 }] },
//           ]}
//           {...pieParams}
//         />
//       </Box>
//     </Stack>
//   );
// }
