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
    <Card
      className="philosopher-card"
      sx={{
        padding: "2rem",
        height: "100%",
        maxWidth: 500,
        backgroundColor: "rgb(193, 188, 181) !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        {imageSrc ? (
          <CardMedia
            component="img"
            loading="lazy"
            image={imageSrc}
            alt={displayName}
            sx={{
              height: "366px !important",
              width: "278px !important",
              margin: "1rem auto",
              borderRadius: "1rem",
            }}
          />
        ) : (
          <Avatar
            alt={displayName}
            sx={{
              height: "366px",
              width: "278px",
              margin: "1rem auto",
              borderRadius: "1rem",
              fontSize: "6rem",
              bgcolor: "rgb(174, 171, 165)",
              color: "#534e46",
            }}
          >
            {initials}
          </Avatar>
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "1000" }}
          >
            {displayName}{" "}
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              {" "}
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
              sx={{ color: "text.secondary", fontWeight: "500" }}
            >
              {shortDescription}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          sx={{ padding: "1rem" }}
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
