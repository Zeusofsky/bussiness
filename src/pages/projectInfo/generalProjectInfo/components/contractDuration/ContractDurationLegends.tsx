import { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";

interface ContractDurationLegendsProps {
    projectDuration: number;
    addendumDuration: number;
}
const ContractDurationLegends: FC<ContractDurationLegendsProps> = ({projectDuration, addendumDuration}):ReactElement => {
    return (
        <Box display='flex' flexDirection='column' >
            <Box display='flex' px={0} py={0} my={0} sx={{width:'130px'}}>
                <Box sx={{height:'20px', width:'20px', bgcolor:'rgb(32, 227, 51, .8)'}}/>
                <Typography px={1} variant='caption'> زمان پروژه: {projectDuration} ماه </Typography>
            </Box>
            {
                addendumDuration &&  
                <Box display='flex' px={0} py={0} my={0} sx={{width:'130px'}}>
                    <Box sx={{height:'20px', width:'20px', bgcolor:'rgba(255, 99, 132, 0.8)'}}/>
                    <Typography px={1} variant='caption' > الحاقیه ها: {addendumDuration} ماه </Typography>
                </Box>
            }
        </Box>
    )
}

export default ContractDurationLegends;