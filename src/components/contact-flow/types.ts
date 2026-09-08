export type ContactFormData = {
  name: string;
  reason: string;
  email: string;
  message: string;
  additionalMessage?: string;
};

export type StepProps = {
  data: ContactFormData;
  updateData: (data: Partial<ContactFormData>) => void;
  nextStep: () => void;
};
