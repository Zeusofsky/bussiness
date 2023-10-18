import React, { FC, ReactElement } from "react";
import { Box, Typography, Divider, Badge } from "@mui/material";


interface ConsultantListItemProps {
    item: string;
    value: string;
}
const ConsultantListItem: FC<ConsultantListItemProps> = ({ item, value }): ReactElement => {
    return(
        <React.Fragment>
        <Box 
            display='flex' 
            justifyContent='space-between' 
            mx={2}
            pl={2}
            minWidth={{md:260, lg:280, xl:300}}
        >
            <Typography 
                variant="body2" 
                mt={0.5} 
                mb={1}
                sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
            >
                {item}
            </Typography>
            <Typography 
                variant="body2" 
                color='text.disabled' 
                mt={0.5} 
                mb={1}
                sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
            >
                {item === 'مشاوران' ?
                    <Badge sx={{bgcolor:'green', color:'aliceblue', borderRadius:5, px:1, py:.2}}>{value}</Badge>
                    :
                    <Badge sx={{bgcolor:'darkgreen', color:'aliceblue', borderRadius:5, px:1, py:.2}}>{value}</Badge>
                }

                {/* {value} */}
            </Typography>
        </Box>
        <Divider/>
        </React.Fragment>
    )
}

export default ConsultantListItem;