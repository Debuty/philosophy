import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import type { ArticleActionsProps } from '../../types/articleDetails';

export const ArticleActions: React.FC<ArticleActionsProps> = ({
  counts,
  onLike,
  onDislike,
  onBookmark,
  onShare,
  isBookmarked,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 4, pt: 3, flexWrap: 'wrap' }}>
      <Button
        variant="outlined"
        startIcon={<ThumbUpIcon />}
        onClick={onLike}
        sx={{ direction: "ltr" }}
      >
        {counts?.likes}
      </Button>
      <Button
        variant="outlined"
        startIcon={<ThumbDownIcon />}
        onClick={onDislike}
        sx={{ whiteSpace: 'nowrap', direction: "ltr" }}
      >
        {counts?.dislikes}
      </Button>
      <div className="article-details-actions">
        <IconButton onClick={onBookmark} color={isBookmarked ? "primary" : "default"}>
          <BookmarkIcon />
        </IconButton>
        <IconButton onClick={onShare}>
          <ShareIcon />
        </IconButton>
      </div>
    </Box>
  );
};
