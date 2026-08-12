import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import type { ArticleActionsProps } from "../../types/articleDetails";

const ACTIVE_REACTION_SX = {
  backgroundColor: "#8B5A2B !important",
  color: "#fff !important",
  borderColor: "#8B5A2B !important",
  "&:hover": {
    backgroundColor: "#6F4622 !important",
    borderColor: "#6F4622 !important",
  },
} as const;

export const ArticleActions: React.FC<ArticleActionsProps> = ({
  counts,
  onLike,
  onDislike,
  onBookmark,
  onShare,
  isBookmarked,
  myReaction = null,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mt: 4, pt: 3, flexWrap: "wrap" }}>
      <Button
       
        startIcon={<ThumbUpIcon />}
        onClick={onLike}
        sx={{ direction: "ltr" ,
          ...(myReaction === "like" ? ACTIVE_REACTION_SX : {}),
        }}
      >
        {counts?.likes}
      </Button>
      <Button
        
        startIcon={<ThumbDownIcon />}
        onClick={onDislike}
        sx={{
          whiteSpace: "nowrap",
          direction: "ltr",
          ...(myReaction === "dislike" ? ACTIVE_REACTION_SX : {}),
        }}
      >
        {counts?.dislikes}
      </Button>
      <div className="article-details-actions">
        <IconButton
          onClick={onBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
          sx={{
            "& svg path": {
              fill: isBookmarked ? "#8B5A2B !important" : "white",
            },
          }}
        >
          <BookmarkIcon />
        </IconButton>
        <IconButton onClick={onShare}>
          <ShareIcon />
        </IconButton>
      </div>
    </Box>
  );
};
