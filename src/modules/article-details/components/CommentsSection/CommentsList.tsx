import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import type { CommentsListProps } from '../../types/articleDetails';

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <List className="article-details-comments-list">
      {comments?.map((comment) => (
        <ListItem 
          key={comment.id} 
          sx={{ 
            alignItems: 'flex-start', 
            mb: 2, 
            padding: '1rem', 
            borderRadius: '1rem', 
            backgroundColor: ' #b8b4ad', 
            direction: "ltr" 
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: '#534e46' }}>
              {comment?.profiles?.username?.charAt(0)?.toUpperCase() || '?'}
            </Avatar>
          </ListItemAvatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '1.3rem' }}>
                {comment.profiles?.username || 'Anonymous'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
                {comment.created_at ? 
                  new Date(comment.created_at).toLocaleDateString() + ' ' + 
                  new Date(comment.created_at).toLocaleTimeString() : ''
                }
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ 
                  fontSize: '1.3rem', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}
              >
                <EditIcon />
                <DeleteForeverIcon />
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 1, fontSize: '1.3rem' }}>
              {comment.content}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                sx={{ color: '#534e46', direction: "ltr" }}
              >
                <ThumbUpIcon fontSize="small" />
                <span style={{ fontSize: '1.3rem', marginLeft: '0.5rem' }}>0</span>
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: '#534e46', direction: "ltr" }}
              >
                <ThumbDownIcon fontSize="small" />
                <span style={{ fontSize: '1.3rem', marginLeft: '0.5rem' }}>0</span>
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
