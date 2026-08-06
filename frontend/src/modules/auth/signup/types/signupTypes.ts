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

// Success modal props
export interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  okButtonText: string;
}

// Error modal props
export interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  title: string;
  message: string;
  okButtonText: string;
  loginButtonText: string;
}

// Signup hook return type
export interface UseSignupReturn {
  form: {
    register: any;
    handleSubmit: any;
    formState: { errors: any };
  };
  isLoading: boolean;
  handleSignup: (data: SignupFormData) => Promise<void>;
  modals: {
    successModal: {
      open: boolean;
      close: () => void;
    };
    errorModal: {
      open: boolean;
      close: () => void;
    };
  };
}
