import { FC, ReactElement } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import StopCircle from '@mui/icons-material/StopCircle';
import StartOutlined from '@mui/icons-material/StartOutlined';
import AnnouncementOutlined from '@mui/icons-material/AnnouncementOutlined';
// import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

import StartRounded from '@mui/icons-material/StartRounded';
import NotificationsRounded from '@mui/icons-material/NotificationsRounded';
// import StartRounded from '@mui/icons-material/PlayArrowOutlined';
// import StartRounded from '@mui/icons-material/StartRounded';


interface ContractTimelineProps {
  startOperationDate: Date,
  notificationDate: Date,
  planStartDate: Date,
  finishDate: Date,
}
const ContractTimeline: FC<ContractTimelineProps> = ({startOperationDate, notificationDate, planStartDate, finishDate}): ReactElement => {
  return (
    <Timeline position="left">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="caption"
          color="text.secondary"
        >
          {/* (typeof startOperationDate === 'object' && startOperationDate !== null && 
            'toLocaleDateString' in startOperationDate) */}
          {startOperationDate && new Date(startOperationDate).toLocaleDateString('fa-IR-u-nu-latn')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <AnnouncementOutlined />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: 1, px: 2 }}>
          <Typography variant="caption">تاریخ ابلاغ قرارداد </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="caption"
          color="text.secondary"
        >
          {notificationDate && new Date(notificationDate).toLocaleDateString('fa-IR-u-nu-latn')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <NotificationsRounded />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: 1, px: 2 }}>
          <Typography variant="caption">تاریخ تنفیذ قرارداد</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="caption"
          color="text.secondary"
        >
          {planStartDate && new Date(planStartDate).toLocaleDateString('fa-IR-u-nu-latn')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <StartOutlined />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: 1, px: 2 }}>
          <Typography variant="caption">تاریخ شروع مطابق برنامه</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="caption"
          color="text.secondary"
        >
          {finishDate && new Date(finishDate).toLocaleDateString('fa-IR-u-nu-latn')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <StopCircle />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: 1, px: 2 }}>
          <Typography variant="caption">تاریخ پایان مطابق برنامه</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default ContractTimeline;
