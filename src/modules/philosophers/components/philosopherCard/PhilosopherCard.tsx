
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '../../../../store'
import { ROUTES } from '../../../../routes/pathes'
import './PhilosopherCard.scss'

import Socrates from '../../../../assets/socrates.jpg'
import type { PhilosopherData } from '../../data/PhilosophersData'

export const PhilosopherCard = ({philosopher}: {philosopher: PhilosopherData}) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const navigate = useNavigate();
  // console.log(philosopher);
  
  return (
    <Card sx={{ maxWidth: 345 , backgroundColor: "rgb(193, 188, 181) !important" }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={Socrates} 
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {lang == "ar" ? philosopher.name.ar : philosopher.name.en}
       
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {lang == "ar" ? philosopher.shortDescription.ar : philosopher.shortDescription.en}
       
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
