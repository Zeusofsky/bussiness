import { FC, ReactNode } from "react";
import { Box, Grid, Typography } from '@mui/material';
import { PasswordRounded, Person } from '@mui/icons-material';



type AuthLayoutProps = {
  children: ReactNode;
}
export const ChangePasswordLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid 
      container
      height='100vh'
      width='100%'
      sx={{
        background: 'linear-gradient(45deg,white,green)',
        fontFamily:'B Nazanin',
        // backgroundImage:`url(${signin})`, backgroundSize:'cover'  
      }}
    >
      <Grid 
        item 
        xs={.005} sm={1.5} md={3} lg={3} xl={3} 
        // height='15vh' 
        pt={3}
        pl={8} 
        display='flex' 
        flexDirection='column'
        justifyContent='flex-start'
      >
        <Box
            display='flex' 
        >
            <PasswordRounded sx={{mt:1, mr:1, width:60, height:60, color:'darkgreen'}} />
            <Typography pt={3} variant="h5" fontWeight={600} fontFamily={'fantasy'} color='#45423f'>تغییر کلمه عبور</Typography>
            {/* تغییر کلمه عبور  */}
        </Box>
        <Box
            display='flex' 
        >
            <Person sx={{mt:1, mr:1, width:60, height:60, color:'darkgreen' }} />
            <Typography pt={3} variant="h5" fontWeight={600} fontFamily={'fantasy'} color='#45423f'>تغییر نام کاربری</Typography>
        </Box>
      </Grid>
      <Grid 
        item  
        xs={0.005} sm={1.5} md={3} lg={3} xl={3} 
        pt={8} 
        sx={{pl:{xs:5, sm:10, md:30, lg:35, xl:35}}} 
        height='85vh' 
        display={{ xs:'none', sm:'flex' }}
      >
        {/* <Typography variant="subtitle2" fontWeight={400} >
          Description about Asfalt Tous project information system.
          The information you believe is necessary to share in public.
          Description about Asfalt Tous project information system.
          The information you believe is necessary to share in public.
        </Typography> */}
      </Grid>
      <Grid 
        item 
        xs={11.99} sm={9} md={6} lg={6} xl={6} 
        mt={0} 
        sx={{pl:{xs:0, sm:2, md:4, lg:6, xl:8}}} 
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        {children}
      </Grid>
    </Grid>
  )
};


