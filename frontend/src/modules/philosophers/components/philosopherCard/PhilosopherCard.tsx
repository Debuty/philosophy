import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../../../../store";
import type { PhilosopherCard as PhilosopherCardType } from "../../types";
import "./PhilosopherCard.scss";

export const PhilosopherCard = ({
  philosopher,
}: {
  philosopher: PhilosopherCardType;
}) => {
  const { t } = useTranslation("philosophers");
  const lang = useSelector((state: RootState) => state.locale.lang);
  const navigate = useNavigate();
  const displayName = lang === "ar" ? philosopher.name_ar : philosopher.name_en;
  const shortDescription =
    lang === "ar"
      ? philosopher.short_description_ar
      : philosopher.short_description_en;
  const imageSrc = philosopher.image ?? undefined;
  const initials = displayName.trim().charAt(0).toUpperCase() || "?";

  return (
    <Card className="philosopher-card">
      <CardActionArea className="philosopher-card__action">
        <div className="philosopher-card__media">
          {imageSrc ? (
            <CardMedia
              component="img"
              loading="lazy"
              image={imageSrc}
              alt={displayName}
              className="philosopher-card__image"
            />
          ) : (
            <Avatar
              alt={displayName}
              className="philosopher-card__avatar-placeholder"
            >
              {initials}
            </Avatar>
          )}
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="philosopher-card__name"
          >
            {displayName}{" "}
            <span className="philosopher-card__years">
              ( {philosopher.birth} / {philosopher.death} )
            </span>
          </Typography>
          <Tooltip
            title={shortDescription ?? ""}
            placement="top"
            enterDelay={400}
            disableHoverListener={!shortDescription}
            slotProps={{
              tooltip: {
                sx: {
                  fontSize: "1.6rem",
                  lineHeight: 1.5,
                  maxWidth: 360,
                  padding: "1rem 1.2rem",
                },
              },
            }}
          >
            <Typography
              variant="body2"
              className="philosopher-card__description"
            >
              {shortDescription}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
      <CardActions className="philosopher-card__actions">
        <Button
          size="small"
          color="primary"
          className="philosopher-card__read-more"
          onClick={() =>
            navigate(`/philosophers/${philosopher.id}`, {
              state: { philosopher },
            })
          }
        >
          {t("Philosophers.philosopherCard.readMore")}
        </Button>
      </CardActions>
    </Card>
  );
};
