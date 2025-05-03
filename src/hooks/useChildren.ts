
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useChildren = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('children')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setChildren(data || []);
      } catch (error: any) {
        console.error('Error fetching children:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [user]);

  return { children, loading, error };
};
