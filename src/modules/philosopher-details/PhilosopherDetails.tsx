import React, { useEffect, useState } from 'react';
import './PhilosopherDetails.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ROUTES } from '../../routes/pathes';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { supabase } from '../../supabaseClient';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/loading/Loading';

const PhilosopherDetails: React.FC = () => {
  const { philosopher } = useLocation().state;
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
  // const [philosopherBio, setPhilosopherBio] = useState<any>(null);

  const getPhilosopherBio = async (philosopherId: string) => {
    const { data, error } = await supabase
      .from('philosopher_bio')
      .select('*')
      .eq('philosopher_id', philosopherId)
      .maybeSingle();

    if (error) {
      console.error(error)
      throw error
    }
    return data
  }

  const { data: philosopherBio, isLoading, error } = useQuery({
    queryKey: ['philosopherBio', philosopher.id],
    queryFn: () => getPhilosopherBio(philosopher.id)
  })

  console.log(philosopherBio)

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])
  // console.log(philosopher.id);
  return (
    <div className="philosopher-details">
      <Button variant="contained" color="primary" sx={{ marginBottom: "1rem" }} onClick={() => navigate(ROUTES.PHILOSOPHERS)} startIcon={<KeyboardReturnIcon />}>{lang == "ar" ? "العودة إلى الفلاسفة" : "Return to Philosophes"}</Button>
      <Grid container spacing={4}>

        <Grid size={{ xs: 12, md: 9 }}>
          <Paper sx={{ padding: "4rem", backgroundColor: "rgb(174 171 165) !important" }}>
            <div className='philosopher-details-info-container'>
              <Avatar src={philosopher.image} sx={{ marginBottom: "1rem", width: "140px", height: "200px" }} />
              <h1>{lang == "ar" ? philosopher.name_ar : philosopher.name_en}</h1>

              {isLoading ? <Loading message="Loading philosopher bio..." /> : error ? <div>Error: {error.message}</div> : philosopherBio && (
                <div className="philosopher-bio-sections">
                  {/* Introduction */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "مقدمة" : "Introduction"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.intro_ar : philosopherBio.intro_en}
                    </Typography>
                  </Box>


                  {/* Early Life */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "الحياة المبكرة" : "Early Life"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.early_life_ar : philosopherBio.early_life_en}
                    </Typography>
                  </Box>


                  {/* Education */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "التعليم" : "Education"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.education_ar : philosopherBio.education_en}
                    </Typography>
                  </Box>


                  {/* Books */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "الكتب" : "Books"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.books_ar : philosopherBio.books_en}
                    </Typography>
                  </Box>


                  {/* School */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "المدرسة الفلسفية" : "Philosophical School"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.school_ar : philosopherBio.school_en}
                    </Typography>
                  </Box>


                  {/* Metaphysics */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "الميتافيزيقا" : "Metaphysics"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.metaphysics_ar : philosopherBio.metaphysics_en}
                    </Typography>
                  </Box>


                  {/* Epistemology */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "نظرية المعرفة" : "Epistemology"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.epistemology_ar : philosopherBio.epistemology_en}
                    </Typography>
                  </Box>


                  {/* Ethics */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "الأخلاق" : "Ethics"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.ethics_ar : philosopherBio.ethics_en}
                    </Typography>
                  </Box>


                  {/* Politics */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "السياسة" : "Politics"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.politics_ar : philosopherBio.politics_en}
                    </Typography>
                  </Box>


                  {/* Theology */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "اللاهوت" : "Theology"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.theology_ar : philosopherBio.theology_en}
                    </Typography>
                  </Box>


                  {/* Influence & Legacy */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "التأثير والإرث" : "Influence & Legacy"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.influence_legacy_ar : philosopherBio.influence_legacy_en}
                    </Typography>
                  </Box>


                  {/* Personal Life */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "الحياة الشخصية" : "Personal Life"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.personal_life_ar : philosopherBio.personal_life_en}
                    </Typography>
                  </Box>


                  {/* Death */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "الوفاة" : "Death"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.death_ar : philosopherBio.death_en}
                    </Typography>
                  </Box>


                  {/* Further Reading */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "قراءات إضافية" : "Further Reading"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.further_reading_ar : philosopherBio.further_reading_en}
                    </Typography>
                  </Box>


                  {/* References */}

                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {lang === "ar" ? "المراجع" : "References"}
                    </Typography>
                    <Typography className='philosopher-details-info-text-long-article'>
                      {lang === "ar" ? philosopherBio.references_ar : philosopherBio.references_en}
                    </Typography>
                  </Box>

                </div>
              )}
            </div>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ padding: "1rem", backgroundColor: "rgb(174 171 165) !important" }}>
            <h1> {lang == "ar" ? "المعلومات السريعة" : "Quick Facts"}</h1>
            <p className='quick-facts-item'> {lang == "ar" ? "المولد" : "Born"} : {philosopher.birth}</p>
            <p className='quick-facts-item'> {lang == "ar" ? "الوفاة" : "Death"} : {philosopher.death}</p>
            <p className='quick-facts-item'> {lang == "ar" ? "الجنسية" : "Nationality"} : {lang == "ar" ? philosopher.nationality_ar : philosopher.nationality_en}</p>

            <p className='quick-facts-item'> {lang == "ar" ? "العصر" : "Era"} : {lang == "ar" ? philosopher.era_ar : philosopher.era_en}</p>
            <p className='quick-facts-item'> {lang == "ar" ? "المدرسة" : "School"} : {lang == "ar" ? philosopher.school_ar : philosopher.school_en}</p>

          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PhilosopherDetails;
