
// We'll import directly from the shadcn component instead of re-importing from our own file
import { useToast as useShadcnToast } from "@radix-ui/react-toast";

// Export the shadcn useToast hook directly
export const useToast = useShadcnToast;

// Define our toast utility functions
export const toast = {
  success: (title: string, options?: { description?: string }) => {
    const { toast } = useShadcnToast();
    toast({
      title,
      description: options?.description,
      variant: "default",
    });
  },
  error: (title: string, options?: { description?: string }) => {
    const { toast } = useShadcnToast();
    toast({
      title,
      description: options?.description,
      variant: "destructive",
    });
  },
  // Add additional toast types as needed
};
