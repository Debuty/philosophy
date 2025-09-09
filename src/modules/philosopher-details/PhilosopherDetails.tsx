import React, { useEffect } from 'react';
import './PhilosopherDetails.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Paper,Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ROUTES } from '../../routes/pathes';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { supabase } from '../../supabaseClient';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/loading/Loading';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "مقدمة" : "Introduction"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.intro_ar : philosopherBio.intro_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/* Early Life */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "الحياة المبكرة" : "Early Life"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.early_life_ar : philosopherBio.early_life_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Education */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "التعليم" : "Education"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.education_ar : philosopherBio.education_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  {/* Books */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel4-content"
                      id="panel4-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "الكتب" : "Books"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.books_ar : philosopherBio.books_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion> 


                  {/* School */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel5-content"
                      id="panel5-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "المدرسة" : "School"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.school_ar : philosopherBio.school_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Metaphysics */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel6-content"
                      id="panel6-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "الميتافيزيقا" : "Metaphysics"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.metaphysics_ar : philosopherBio.metaphysics_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Epistemology */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel7-content"
                      id="panel7-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "نظرية المعرفة" : "Epistemology"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.epistemology_ar : philosopherBio.epistemology_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  {/* Ethics */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel8-content"
                      id="panel8-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "الأخلاق" : "Ethics"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.ethics_ar : philosopherBio.ethics_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  {/* Politics */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel9-content"
                      id="panel9-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "السياسة" : "Politics"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.politics_ar : philosopherBio.politics_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  {/* Theology */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel10-content"
                      id="panel10-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "التواصل والإرث" : "Influence & Legacy"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.influence_legacy_ar : philosopherBio.influence_legacy_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Influence & Legacy */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel11-content"
                      id="panel11-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "التأثير والإرث" : "Influence & Legacy"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.influence_legacy_ar : philosopherBio.influence_legacy_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  {/* Personal Life */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel12-content"
                      id="panel12-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "الحياة الشخصية" : "Personal Life"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.personal_life_ar : philosopherBio.personal_life_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  {/* Death */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel13-content"
                      id="panel13-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "الوفاة" : "Death"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.death_ar : philosopherBio.death_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Further Reading */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel14-content"
                      id="panel14-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "قراءات إضافية" : "Further Reading"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>  
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.further_reading_ar : philosopherBio.further_reading_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* References */}

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel15-content"
                      id="panel15-header"
                    >
                      <Typography className='philosopher-bio-sections-title' component="span">{lang === "ar" ? "المراجع" : "References"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className='philosopher-bio-sections-text'>
                        {lang === "ar" ? philosopherBio.references_ar : philosopherBio.references_en}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

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
