
// We're creating a proper toast hook file to replace the re-exported one
import { useToast as useShadcnToast } from "@/components/ui/use-toast"

export const useToast = useShadcnToast;

export const toast = {
  // Re-export the methods we need from sonner or another toast library
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
