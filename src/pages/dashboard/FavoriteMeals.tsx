import { FC, ReactElement } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import FavoriteProject from "./FavoriteMeal";


const FavoriteProjects: FC = (): ReactElement => {
    return(
        <Card sx={{height:200, color:'text.secondary'}}>
            <Box 
                display='flex' 
                justifyContent='space-between' 
                height='20%'
                pt={1} 
                // sx={{backgroundColor:'whitesmoke'}}
            >
                <Typography 
                    variant="subtitle1" 
                    m={2}
                    sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
                >
                    Favorite Projects
                </Typography>
                <Typography 
                    variant="subtitle2" 
                    color='lightblue' 
                    m={2}
                    sx={{
                        textDecoration:'underline', 
                        cursor: 'pointer', 
                        fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
                    }}
                >
                    View More
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
                <FavoriteProject mealName={'Project3'} orderNo={1864}/>
                <FavoriteProject mealName={'Project4'} orderNo={2265}/>
                <FavoriteProject mealName={'Project5'} orderNo={1123}/>
            </CardContent>
        </Card>
    )
}

export default FavoriteProjects;