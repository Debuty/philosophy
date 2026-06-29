import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/pathes';
import './CallToAction.scss';

const CallToAction: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box className="cta-section">
            <Container maxWidth="lg">
                <Box className="cta-section__content">
                    <Typography variant="h3" className="cta-section__title">
                        {t('cta_title', { ns: 'home' })}
                    </Typography>
                    <Typography variant="h6" className="cta-section__subtitle">
                        {t('cta_subtitle', { ns: 'home' })}
                    </Typography>
                    <Box className="cta-section__buttons">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate(ROUTES.PHILOSOPHERS)}
                            className="cta-section__primary-btn"
                        >
                            {t('get_started', { ns: 'home' })}
                        </Button>
                    </Box>
                </Box>

            </Container>
        </Box>
    );
};

export default CallToAction;

