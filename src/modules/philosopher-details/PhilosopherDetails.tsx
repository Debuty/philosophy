import React, { useEffect } from 'react';
import './PhilosopherDetails.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ROUTES } from '../../routes/pathes';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const PhilosopherDetails: React.FC = () => {
  const { philosopher } = useLocation().state;
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])
  return (
    <div className="philosopher-details">
      <Button variant="contained" color="primary" sx={{ marginBottom: "1rem" }} onClick={() => navigate(ROUTES.PHILOSOPHERS)} startIcon={ <KeyboardReturnIcon />}>{lang == "ar" ? "العودة إلى الفلاسفة" : "Return to Philosophes"}</Button>
      <Grid container spacing={4}>

        <Grid size={{ xs: 12, md: 9 }}>
          <Paper sx={{ padding: "4rem", backgroundColor: "rgb(174 171 165) !important" }}>
            <div className='philosopher-details-info-container'>
              <Avatar src={philosopher.image} sx={{ marginBottom: "1rem", width: "140px", height: "200px" }} />
              <h1>{lang == "ar" ? philosopher.name_ar : philosopher.name_en}</h1>
             
              <p className='philosopher-details-info-text-long-article'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus. 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore deleniti, cum dicta eveniet ratione accusamus, itaque dignissimos maiores aliquid numquam error ipsa? Nemo fuga debitis dignissimos ipsa rem delectus. 
              </p>
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
