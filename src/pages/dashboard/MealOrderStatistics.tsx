import { FC, ReactElement } from "react";
import { Card, CardContent } from "@mui/material";
import ProjectOrderStatistic from "./MealOrderStatistic";


const ProjectOrderStatistics: FC = (): ReactElement => {
    return(
        <Card sx={{m:'auto',p:'auto', color:'text.secondary'}}>
            <CardContent>
                <ProjectOrderStatistic ProjectName={'Project1'} orderNo={1045}/>
                <ProjectOrderStatistic ProjectName={'Project2'} orderNo={824}/>
                <ProjectOrderStatistic ProjectName={'Project3'} orderNo={1864}/>
                <ProjectOrderStatistic ProjectName={'Project4'} orderNo={2265}/>
                <ProjectOrderStatistic ProjectName={'Project5'} orderNo={1123}/>
            </CardContent>
        </Card>
    )
}

export default ProjectOrderStatistics;