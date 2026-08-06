import { z } from 'zod';

// Validation schema
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// Form field configurations
export const formFields = [
  {
    name: 'email' as const,
    label: 'signup.email',
    type: 'text',
  },
  {
    name: 'password' as const,
    label: 'signup.password',
    type: 'password',
  },
  {
    name: 'username' as const,
    label: 'signup.username',
    type: 'text',
  },
  {
    name: 'phone' as const,
    label: 'signup.phone',
    type: 'tel',
  },
] as const;

// Default form values
export const defaultFormValues = {
  email: '',
  password: '',
  username: '',
  phone: '',
};

// Modal styles
export const modalStyles = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
