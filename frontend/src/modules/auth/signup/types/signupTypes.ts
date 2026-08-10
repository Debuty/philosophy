// Signup form data type
export interface SignupFormData {
  email: string;
  password: string;
  username: string;
  phone: string;
}

// Signup form props
export interface SignupFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

// Form field props
export interface FormFieldProps {
  name: keyof SignupFormData;
  label: string;
  type?: string;
  error?: string;
  register: any;
}

// Signup hook return type
export interface UseSignupReturn {
  form: {
    register: any;
    handleSubmit: any;
    formState: { errors: any };
  };
  isLoading: boolean;
  handleSignup: (data: SignupFormData) => void;
}
