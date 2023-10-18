import { FC, ReactElement } from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
// import { Box, } from '@mui/material';
import { ICorporationItem } from '../../../../../models/contractCorporation';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'left',
      labels: {
      }
    }
    // plugins: {
    //     legend: {
    //         labels: {
    //             position: 'left',
    //             boxWidth: 10
    //         }
    //     }
    // }

    // plugins: {
    //     tooltip: {
    //       titleFont: {
    //         size: 9
    //       },
    //       bodyFont: {
    //         size: 9
    //       },
    //     },
    //     legend: {
    //         display: true,
    //         responsive: true,
    //         position: "bottom",
    //         labels: {
    //             boxWidth: 10,
    //             padding: 2,
    //             font: {
    //                 size: 9
    //             },
    //         },
    //         align: "center",
    //     },
    // }
}

// interface ContractCorporationPieChartProps {
//     corporationItems: ICorporationItem[],
//     title: string,
// }: FC<ContractCorporationPieChartProps>  : ReactElement
const ContractCorporationPieChart_ = ({corporationItems, title}) => {
    const extractData = () => {
        let labels = []
        let values = []

        corporationItems.map(item => ((
            labels.push(item.label),
            values.push(item.value)
        )))

        const data = {
            labels: labels,
            datasets: [
                {
                label: '#درصد مشارکت',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                },
            ],
        };
        return data
    }

    return(
        <Box display='flex' flexDirection='column' justifyContent='space-around' sx={{height:320, width:156}} my={.2} py={0}
            mx={.1} alignItems='center' border={1} borderColor='rgb(0, 0, 0, .2)' borderRadius={3}>
            <Typography mx={1} variant="subtitle1" textAlign='center' fontFamily='cursive' fontStyle='italic' 
                    px={0} fontWeight={700} color='rgb(0, 0, 0, .05'>
                {title}
            </Typography>
            <Pie data={extractData()} height={150} width={200} options={options}/>
        </Box>
    )
}

export default ContractCorporationPieChart_

