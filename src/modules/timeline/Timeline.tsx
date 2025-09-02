import React, { useState } from 'react';
import {
  Typography,
  Modal,
  Box,
  Card,
  CardContent,
  Button,
  Container,
  Paper
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@mui/lab';
import { School, Person, History, Psychology, Lightbulb } from '@mui/icons-material';
import './Timeline.scss';

interface TimelineData {
  id: number;
  title: string;
  shortDescription: string;
  modalDetails: string[];
  icon: React.ReactElement;
}

const timelineData: TimelineData[] = [
  {
    id: 1,
    title: 'الفلسفة القديمة',
    shortDescription: 'الفلاسفة قبل سقراط، سقراط، أفلاطون، أرسطو.',
    modalDetails: [
      'الفلاسفة قبل سقراط: البحث عن أصل الكون.',
      'سقراط: الحوار والجدل.',
      'أفلاطون: نظرية المثل والأكاديمية.',
      'أرسطو: المنطق، الطبيعة، الأخلاق، الميتافيزيقا.'
    ],
    icon: <History />
  },
  {
    id: 2,
    title: 'الفلسفة في العصور الوسطى',
    shortDescription: 'أوغسطينوس، الفلسفة الإسلامية، توما الأكويني.',
    modalDetails: [
      'أوغسطينوس: الدمج بين المسيحية والأفلاطونية.',
      'الفلسفة الإسلامية: الكندي، الفارابي، ابن سينا، ابن رشد.',
      'توما الأكويني: التوفيق بين العقل والإيمان.'
    ],
    icon: <School />
  },
  {
    id: 3,
    title: 'الفلسفة الحديثة المبكرة',
    shortDescription: 'ديكارت، سبينوزا، لوك، هيوم.',
    modalDetails: [
      'ديكارت: "أنا أفكر إذن أنا موجود".',
      'سبينوزا: وحدة الوجود.',
      'لوك: التجريبية والمعرفة.',
      'هيوم: الشك والتجريبية.'
    ],
    icon: <Lightbulb />
  },
  {
    id: 4,
    title: 'الفلسفة الحديثة',
    shortDescription: 'كانط، هيجل، ماركس، نيتشه.',
    modalDetails: [
      'كانط: العقل النقدي.',
      'هيجل: الجدل.',
      'ماركس: المادية التاريخية.',
      'نيتشه: إرادة القوة وموت الإله.'
    ],
    icon: <Psychology />
  },
  {
    id: 5,
    title: 'الفلسفة المعاصرة',
    shortDescription: 'سارتر، هايدغر، فتجنشتاين، فوكو، دريدا.',
    modalDetails: [
      'سارتر: الوجودية.',
      'هايدغر: الكينونة والزمن.',
      'فتجنشتاين: اللغة والتحليل.',
      'فوكو: السلطة والمعرفة.',
      'دريدا: التفكيك.'
    ],
    icon: <Person />
  }
];

const TimelinePage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: TimelineData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="timeline-page">
      {/* Page Header */}
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          mb: 6,
          fontWeight: 'bold',
          color: 'primary.main',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        الخط الزمني لتاريخ الفلسفة
      </Typography>

      {/* MUI Timeline */}
      <Timeline
        position="alternate"
        sx={{
          '& .MuiTimelineItem-root': {
            minHeight: '120px'
          }
        }}
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={item.id}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  width: 56,
                  height: 56,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.icon}
              </TimelineDot>
              {index < timelineData.length - 1 && (
                <TimelineConnector
                  sx={{
                    backgroundColor: 'primary.light',
                    width: 3
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    backgroundColor: 'action.hover'
                  }
                }}
                onClick={() => handleItemClick(item)}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center'
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    lineHeight: 1.6,
                    color: 'text.secondary'
                  }}
                >
                  {item.shortDescription}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="timeline-modal-title"
        aria-describedby="timeline-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {selectedItem && (
              <>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center',
                    mb: 3
                  }}
                >
                  {selectedItem.title}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {selectedItem.modalDetails.map((detail, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        mb: 2,
                        p: 2,
                        backgroundColor: 'action.hover',
                        borderRadius: 2,
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        lineHeight: 1.6
                      }}
                    >
                      {detail}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleCloseModal}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                  >
                    إغلاق
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Modal>
    </Container>
  );
};

export default TimelinePage;
