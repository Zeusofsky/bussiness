import { FC, ReactElement } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
// import { 
//     Business,
// } from '@mui/icons-material'

import ListItem from "./ConsultantListItem";
import { IContractConsultant } from "../../../../../models/contractConsultant";


interface CustomerConsultantListProps {
    customer: string;
    consultants: IContractConsultant[];
}
const CustomerConsultantList: FC<CustomerConsultantListProps> = ({ customer, consultants }): ReactElement => {
    const theme = useTheme();
    return(
        <Card sx={{height:200, minWidth:{xs:450,sm:500,md:420,lg:450,xl:475}, bgcolor:theme.palette.background.paper, borderRadius:2, boxShadow:4}} >
            <Box 
                display='flex' 
                justifyContent='space-between' 
                height='20%'
                py={1} 
                px={2}
                mb={2}
                // sx={{backgroundColor:'whitesmoke'}}

            >
                <Typography 
                    variant="subtitle1" 
                    m={2}
                    sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
                >
                    {/* کارفرما و مشاور */}
                </Typography>
                <Typography 
                    variant="subtitle1" 
                    m={2}
                    px={4}
                    sx={{
                        fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
                    }}
                >
                    {/* <Tooltip title='شرکت'>
                        <Business sx={{width:25, height:25, color:'darkgreen'}}/>
                    </Tooltip>   */}
                    شرکت
                </Typography>
            </Box>
            <CardContent 
                sx={{
                    height:'80%', 
                    m:'auto', 
                    p:'auto', 
                    // backgroundColor:'whitesmoke'
                }} 
            >
                <ListItem item={'کارفرما'} value={customer}/>
                {consultants && consultants.map((consultant, index) =>(
                    <ListItem key={index} item={'مشاوران'} value={consultant.consultant}/>
                ))}
            </CardContent>
        </Card>
    )
}

export default CustomerConsultantList;