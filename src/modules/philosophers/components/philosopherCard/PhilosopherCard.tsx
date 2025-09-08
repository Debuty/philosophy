
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '../../../../store'

import './PhilosopherCard.scss'



// Interface for Supabase philosopher data
interface SupabasePhilosopher {
  id: string;
  name_en: string;
  name_ar: string;
  birth: number;
  death: number;
  era_en: string;
  era_ar: string;
  nationality_en: string;
  nationality_ar: string;
  school_en: string;
  school_ar: string;
  quote_en: string;
  quote_ar: string;
  short_description_en: string;
  short_description_ar: string;
  image: string;
}

export const PhilosopherCard = ({philosopher}: {philosopher: SupabasePhilosopher}) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const navigate = useNavigate();
  // console.log(philosopher);
  
  return (
    <Card sx={{ maxWidth: 500 , backgroundColor: "rgb(193, 188, 181) !important" }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="500"
        image={philosopher.image} 
        alt={lang == "ar" ? philosopher.name_ar : philosopher.name_en}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "1000" }}>
          {lang == "ar" ? philosopher.name_ar : philosopher.name_en} <span style={{ fontSize: "2rem", fontWeight: "500" , whiteSpace: "nowrap" }}> ( {philosopher.birth} / {philosopher.death} )</span>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: "500" }}>
          {lang == "ar" ? philosopher.short_description_ar : philosopher.short_description_en}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button 
        size="small" 
        color="primary" 
        sx={{padding: "1rem"}}
        onClick={() => navigate(`/philosophers/${philosopher.id}`, { state: { philosopher } })}
      >
        {lang == "ar" ? "اقرأ المزيد" : "Read More"}
      </Button>
    </CardActions>
  </Card>
  )
}
