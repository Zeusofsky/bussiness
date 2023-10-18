import { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MediaCard from './MediaCard';
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import img4 from '../../assets/img5.png'
import LineChart from './LineChart';
import ProjectOrderStatistics from './MealOrderStatistics';
import FavoriteProjects from './FavoriteMeals';
import Suggestions from './Suggestions';
import { Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode !== 'dark' ? 'whitesmoke' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: FC = (): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1, px: 3, pt:0, pb:6}} >
      <Box>
        <Typography 
          variant='h5' 
          sx={{pt:0, pb:4}} 
          fontWeight={600}
          color='text.secondary'
        >
          Dashboard
        </Typography>
      </Box>
      <Grid 
        container 
        rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'Project #1'} description={'Project #1'} imgUrl={img1} />
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'Project #2'} description={'Project #2'} imgUrl={img2}/>
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'Project #3'} description={'Project #3'} imgUrl={img3}/>
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'Project #4'} description={'Project #4'} imgUrl={img4}/>
        </Grid>
        <Grid item xs={10} sm={10} md={8} lg={8}>
          <Item sx={{height: 350,  }}>
            <LineChart />
          </Item>
        </Grid>
        <Grid item xs={10} sm={8} md={4} lg={4}>
          <Item sx={{height: 350,  }}>
            <ProjectOrderStatistics/>
          </Item>
        </Grid>
        <Grid item xs={10} sm={8} md={6} lg={6}>
          <FavoriteProjects />
        </Grid>
        <Grid item xs={10} sm={8} md={6} lg={6}>
          <Suggestions/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;