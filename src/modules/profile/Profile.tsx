import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Button, Avatar } from '@mui/material';
import './Profile.scss';
import {  useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';
import type {  User } from '@supabase/supabase-js';
import Loading from '../../shared/loading/Loading';
import {ToastContainer } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { getCurrentUser} from '../../utils/auth';
import { debugLog } from '../../utils/debug';
const Profile: React.FC = () => {

    // state
    const [user, setUser] = useState<User | null>(null)
    // const queryClient = useQueryClient()

    // check session
    useEffect(() => {
        // checkSession()
        getCurrentUser().then(data => setUser(data))
      
     
    }, [])
  
    // check session
    // async function checkSession() {
    //     const { data, error } = await supabase.auth.getSession()

    //     if (error) {
    //         console.error("Error getting session:", error)
    //         return
    //     }

    //     if (data.session) {

    //         setUser(data.session.user)
    //         return data.session
    //     } else {
    //         console.log("No active session (user not logged in).")
    //     }
    // }

    // update name profile
    // const updateNameProfile = async (dataForm: any) => {
    //     const { data, error } = await supabase.from('profiles').update({
    //         username: dataForm.username,
    //     }).eq('id', user?.id).single();
    //     if (error) throw error;
    //     return data;
    // }
   

    // update name profile
    // const { mutate: updateNameProfileMutation} = useMutation({
    //     mutationFn: updateNameProfile,
    //     onSuccess: (data) => {
    //         console.log(data);
    //         toast.success('Profile updated successfully');
    //          queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
    //     },
    //     onError: (error) => {
    //         console.error('Error updating profile:', error.message);
    //         toast.error('Error updating profile');
    //     },
    // })
    // handle update name profile
    // const handleUpdateNameProfile = (dataForm: any) => {
    //     updateNameProfileMutation(dataForm);
    // }
// update bio profile
    // const updateBioProfile = async (dataForm: any) => {
    //     const { data, error } = await supabase.from('profiles').update({
    //         bio: dataForm.bio,
    //     }).eq('id', user?.id).single();
    //     if (error) throw error;
    //     return data;
    // }

    // update bio profile
    // const { mutate: updateBioProfileMutation, isPending: isUpdateBioProfilePending} = useMutation({
    //     mutationFn: updateBioProfile,
    //     onSuccess: (data) => {
    //         console.log(data);
    //         toast.success('Profile updated successfully');
    //         queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
    //     },
    // })

    // handle update bio profile
    // const handleUpdateBioProfile = (dataForm: any) => {
    //     updateBioProfileMutation(dataForm);
    // }

   
    // get profile
    const getProfile = async () => {
        const user_info = user
        if (user_info) {
            const { data, error } = await supabase.from('profiles').select('*').eq('id', user_info.id).single();
            if (error) throw error;
            return data;
        }
        return null
    }

    // get profile
    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['profile', user?.id],
        queryFn: () => getProfile(),
        refetchOnWindowFocus: false
    })

    if(isLoading) {
        return <div> <Loading message="Loading profile..." /></div>
    }
    if(error || profile == null) {
        return <div>Error loading profile</div>
    }
    debugLog(profile?.full_name)
    return (
        <div className="profile">
            <Grid container spacing={2} className="profile__grid">
                <Grid size={{ xs: 12, md: 9 }} className="profile__main" spacing={2}>
                    <Paper elevation={2} sx={{ p: 3 }} className="profile__main-paper">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 3, mb: 3 }} className="profile__header">
                            <Box className="profile__avatar">
                                <Avatar sx={{ width: 80, height: 80 }} className="profile__avatar-image" />
                            </Box>
                            <Box className="profile__user-info">
                                <Typography variant="h4" component="h1" className="profile__title">
                                    {profile?.username}  <EditIcon className="profile__edit-icon" />
                                </Typography>
                                <Typography variant="body1" className="profile__email">
                                    {user?.email}
                                </Typography>
                                <Typography variant="body2" className="profile__bio">
                                    {profile?.bio}  <EditIcon className="profile__edit-icon" />
                                </Typography>
                                <Box sx={{ mt: 2 }} className="profile__edit-button-container">
                                    <Button variant="contained" className="profile__edit-button">
                                        Edit Profile
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>

                    <Grid container spacing={2} className="profile__content-grid" sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} className="profile__content-item">
                            <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' ,borderRadius: 4}} className="profile__content-paper">
                                <Typography variant="h6" className="profile__content-title">
                                    <p style={{fontSize: '1.5rem' , textAlign: 'center'}}>  {profile?.articles_count} </p> 
                                    Articles
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} className="profile__content-item">
                            <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' ,borderRadius: 4}} className="profile__content-paper">
                                <Typography variant="h6" className="profile__content-title">
                                    <p style={{fontSize: '1.5rem' , textAlign: 'center'}}>  {profile?.books_to_read_count} </p> 
                                    Books to read
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} className="profile__content-item">
                            <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' ,borderRadius: 4}} className="profile__content-paper">
                                <Typography variant="h6" className="profile__content-title">
                                   <p style={{fontSize: '1.5rem' , textAlign: 'center'}}>  {profile?.books_reading_count} </p> 
                                   Books reading
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} className="profile__content-item">
                            <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' ,borderRadius: 4}} className="profile__content-paper">
                                <Typography variant="h6" className="profile__content-title">
                                <p style={{fontSize: '1.5rem' , textAlign: 'center'}}>  {profile?.books_read_count} </p> 
                                Books read
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} className="profile__content-item">
                                 <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' ,borderRadius: 4}} className="profile__content-paper">
                                <Typography variant="h6" className="profile__content-title">
                               <p style={{fontSize: '1.5rem' , textAlign: 'center'}}>  {profile?.books_favorites_count} </p> 
                                Books favorites
                                    </Typography>
                            </Paper>
                        </Grid>
                    </Grid> 
                    
                </Grid>
                <Grid size={{ xs: 12, md: 3 }} className="profile__sidebar">
                    <Paper elevation={2} sx={{ p: 3, mb: 2 }} className="profile__sidebar-paper">
                        <Typography variant="h6" component="h3" gutterBottom className="profile__sidebar-title">
                            Sidebar
                        </Typography>
                        <Typography variant="body2" className="profile__sidebar-description">
                            This sidebar takes up 3 columns on medium screens and larger.
                        </Typography>
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }} className="profile__widget">
                            <Typography variant="subtitle2" gutterBottom className="profile__widget-title">
                                Quick Stats
                            </Typography>
                            <Box component="ul" sx={{ m: 0, pl: 2 }} className="profile__widget-list">
                                <Typography component="li" variant="body2" color="text.secondary" className="profile__widget-item">
                                    Posts: 0
                                </Typography>
                                <Typography component="li" variant="body2" color="text.secondary" className="profile__widget-item">
                                    Comments: 0
                                </Typography>
                                <Typography component="li" variant="body2" color="text.secondary" className="profile__widget-item">
                                    Joined: Today
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper elevation={2} sx={{ p: 3 }} className="profile__sidebar-paper profile__sidebar-paper--additional">
                        <Typography variant="h6" component="h3" gutterBottom className="profile__sidebar-title">
                            Additional Info
                        </Typography>
                        <Typography variant="body2" className="profile__sidebar-description">
                            This is another paper component to match the height of the first paper.
                        </Typography>
                        <Box sx={{ mt: 2 }} className="profile__additional-content">
                            <Typography variant="subtitle2" gutterBottom className="profile__additional-title">
                                More Details
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="profile__additional-text">
                                Additional content can go here to fill the space and match the height.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
};

export default Profile;
