import { FC, ReactNode } from "react";
import { Grid, Typography } from '@mui/material';
import { asft } from '../assets'


type AuthLayoutProps = {
  children: ReactNode;
}
export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid 
      container
      height='100vh'
      width='100%'
      sx={{
        background: 'linear-gradient(135deg,white,#f66e06)',
        fontFamily:'B Nazanin',
        // backgroundImage:`url(${signin})`, backgroundSize:'cover'  
      }}
    >
      <Grid 
        item 
        xs={12} sm={12} md={12} lg={12} xl={12} 
        height='15vh' 
        pt={3}
        pl={8} 
        display='flex' 
        justifyContent='flex-start'
      >
        <img style={{width:70, height:70}} src={asft} alt='img'/>
        <Typography pt={2} px={1} variant="h4" fontWeight={600} fontFamily={'fantasy'} color='#45423f'>PMRS </Typography>
        <Typography pt={4} variant="subtitle2" fontWeight={600} fontFamily={'fantasy'} color='#45423f'>( Asfalt Tous Co. )</Typography>
      </Grid>
      <Grid 
        item  
        xs={0.01} sm={3} md={6} lg={6} xl={6} 
        pt={8} 
        sx={{pl:{xs:5, sm:10, md:30, lg:35, xl:35}}} 
        height='85vh' 
        display={{ xs:'none', sm:'flex' }}
      >
        {/* <Typography variant="subtitle2" fontWeight={400} >
          Description about Project Management Information System.
          The information you believe is necessary to share in public.
          Description about Project Management Information System.
          The information you believe is necessary to share in public.
        </Typography> */}
      </Grid>
      <Grid 
        item 
        xs={11.99} sm={9} md={6} lg={6} xl={6} 
        mt={0} 
        sx={{pl:{xs:0, sm:2, md:4, lg:6, xl:8}}} 
      >
        {children}
      </Grid>
    </Grid>
  )
};


