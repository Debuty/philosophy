import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, defaultFormValues } from '../constants/signupConstants';
import { signupUser, checkUserExists } from '../services/signupService';
import type { SignupFormData, UseSignupReturn } from '../types/signupTypes';

export const useSignup = (): UseSignupReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultFormValues,
  });

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      const result = await signupUser(data);
      
      if (checkUserExists(result)) {
        setErrorModalOpen(true);
      } else {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleSignup,
    modals: {
      successModal: {
        open: successModalOpen,
        close: () => setSuccessModalOpen(false),
      },
      errorModal: {
        open: errorModalOpen,
        close: () => setErrorModalOpen(false),
      },
    },
  };
};
