import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import ScheduleIcon from '@mui/icons-material/Schedule';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function TravelHighlightsTimeline() {
  return (
    <Timeline position="alternate">
      {/* Schedule */}
      <TimelineItem sx={{ minHeight: 120 }}>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <ScheduleIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6">Schedule</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Plan your trips and organize your day efficiently
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {/* AI Recommendation */}
      <TimelineItem sx={{ minHeight: 120 }}>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="secondary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6">AI Recommendation</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Get personalized travel suggestions using AI
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Blogs */}
      <TimelineItem sx={{ minHeight: 120 }}>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="success">
            <MenuBookIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6">Blogs</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Read travel stories, tips, and guides from other explorers
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Get All Places Saved */}
      <TimelineItem sx={{ minHeight: 120 }}>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="error">
            <BookmarkIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6">Get All Places Saved</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Keep track of all the destinations you want to visit
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}