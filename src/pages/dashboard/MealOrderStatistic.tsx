import { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";


interface ProjectOrderStatisticProps {
    ProjectName: string;
    orderNo: number;
}
const ProjectOrderStatistic: FC<ProjectOrderStatisticProps> = ({ ProjectName, orderNo }): ReactElement => {
    return(
        <Box 
            display='flex' 
            flexDirection='column' 
            mx='auto' 
            my={0.5} 
            p='auto' 
            border={1}
            // borderColor='text.disabled'
        >
            <Typography 
                // color='text.disabled' 
                variant="body1" 
                sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
            >
                {ProjectName}
            </Typography>
            <Typography 
                variant="subtitle1" 
                sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
            >
                {orderNo}
            </Typography>
        </Box>
    )
}

export default ProjectOrderStatistic;