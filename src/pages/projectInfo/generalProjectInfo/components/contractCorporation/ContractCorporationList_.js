import { FC, ReactElement } from "react";
import { Box, useTheme } from "@mui/material";
import { IContractCorporation } from "../../../../../models/contractCorporation";
import ContractCorporationPieChart_ from "./ContractCorporationPieChart_";


// interface ContractCorporationListProps {
//     corporations: IContractCorporation;
// }: FC<ContractCorporationListProps>   : ReactElement

const ContractCorporationList_ = ({corporations}) => {
    const theme = useTheme();
    // console.log('corporations: ', corporations)
    return(
        <Box sx={{height:330, minWidth:{xs:450,sm:500,md:420,lg:450,xl:475}, bgcolor:theme.palette.background.paper, borderRadius:2, boxShadow:4}} >
            <Box 
                display='flex' 
                // justifyContent='flex-start' 
                py={.5} 
                px={0}
            >
                {corporations && corporations.E && 
                    <ContractCorporationPieChart_ corporationItems={corporations.E} title={'Engineering'}/>
                }    
                {corporations && corporations.P && 
                    <ContractCorporationPieChart_ corporationItems={corporations.P} title={'Procurement'}/>
                }
                {corporations && corporations.C && 
                    <ContractCorporationPieChart_ corporationItems={corporations.C} title={'Construction'}/>
                }
            </Box>
        </Box>
    )
}

export default ContractCorporationList_;





//  {/*    <Typography 
//         variant="subtitle1" 
//         m={2}
//         mr={4}
//         sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
//     >
//         <Tooltip title='اجرا' sx={{fontSize:'12pt'}}>
//             <ConstructionRounded sx={{width:25, height:25, color:'darkblue'}}/>
//         </Tooltip>
//     </Typography>
//     <Typography 
//         variant="subtitle1" 
//         m={2}
//         sx={{
//             fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
//         }}
//     >
//         <Tooltip title='تدارک'>
//             <Shop sx={{width:25, height:25, color:'green'}}/>
//         </Tooltip>
//     </Typography>
//     <Typography 
//         variant="subtitle1" 
//         m={2}
//         sx={{
//             fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
//         }}
//     >
//         <Tooltip title='مهندسی'>
//             <EngineeringRounded sx={{width:25, height:25, color:'brown'}}/>
//         </Tooltip>
//     </Typography>
//     <Typography 
//         variant="subtitle1" 
//         m={2}
//         mr={4}
//         sx={{
//             fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
//         }}
//     >
//         {/* <Tooltip title='شرکت'>
//             <Business sx={{width:25, height:25, color:'darkgreen'}}/>
//         </Tooltip>     
//         شرکت                
//     </Typography>
// </Box> */}
// {/* <CardContent 
//     sx={{
//         // height:'80%', 
//         m:'auto', 
//         p:'auto', 
//         // backgroundColor:'whitesmoke'
//     }} 
// >

//     {corporations ? (
//         corporations.E && 
//         <ContractCorporationPieChart corporationItems={corporations.E}/>,
//         corporations.C && 
//         <ContractCorporationPieChart corporationItems={corporations.C}/>,
//         corporations.P && 
//         <ContractCorporationPieChart corporationItems={corporations.P}/>
//     ): <></>}             

// */}