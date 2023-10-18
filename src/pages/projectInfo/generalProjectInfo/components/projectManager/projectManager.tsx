import { FC, ReactElement } from "react";
import { Box, FormControlLabel, Typography, useTheme } from "@mui/material";
import { ManageAccountsRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { BpCheckbox } from "../../../../../components";

interface ProjectManagerProps {
    label: string,
    imageSrc: string,
    projectManagerConfirmed: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}
const ProjectManager: FC<ProjectManagerProps> = ({ label, imageSrc, projectManagerConfirmed, handleChange }): ReactElement => {
    const theme = useTheme();
    return (
        <Box display='flex' justifyContent='space-between' mt={.7} pl={3} sx={{bgcolor:theme.palette.background.paper}} >
            <Box >
                <Avatar 
                    sx={{ 
                          display: { xs: "none", md: "flex" }, 
                          width:90, 
                          height:90, 
                          m:0, 
                          mt:-.4,
                          p:0,
                          gap:.5
                        }}
                        src={imageSrc}
                        alt='avatar'
                    />
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center' px={6} pt={2.2}>
                <Typography variant='body1' fontFamily='B Nazanin'>
                    مدیر پروژه : {label}
                </Typography>
                <FormControlLabel 
                    control={
                        <BpCheckbox 
                            checked={projectManagerConfirmed}
                            onChange={handleChange}
                        />
                    } 
                    label={
                        <Typography variant='body2' fontFamily='B Nazanin'> 
                            تائید گزارشات ماهانه ی پروژه
                        </Typography> 
                    }
                    sx={{mr:-1}}
                />
            </Box>
            <ManageAccountsRounded sx={{px:1, width:55, height:55, color:'green'}}/>
        </Box>
    )
}

export default ProjectManager;



