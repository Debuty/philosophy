import { supabase } from '../../../../supabaseClient';
import type { SignupFormData } from '../types/signupTypes';

export const signupUser = async (formData: SignupFormData) => {
  const { data, error } = await supabase.auth.signUp({
    ...formData,
    options: {
      data: {
        username: formData.username,
        phone: formData.phone,
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const checkUserExists = (userData: any): boolean => {
  return userData?.user?.identities?.length === 0;
};
