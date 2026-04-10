import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMaintenanceMode = () => {
  const queryClient = useQueryClient();
  const [forceReady, setForceReady] = useState(false);

  // Safety timeout: never stay loading more than 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setForceReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const { data: isMaintenanceMode, isLoading: queryLoading } = useQuery({
    queryKey: ["maintenance-mode"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "maintenance_mode")
          .maybeSingle();

        if (error) {
          return false;
        }

        return data?.value === "true";
      } catch {
        return false;
      }
    },
    staleTime: 30000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isLoading = queryLoading && !forceReady;

  const toggleMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: enabled ? "true" : "false", updated_at: new Date().toISOString() })
        .eq("key", "maintenance_mode");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-mode"] });
    },
  });

  return {
    isMaintenanceMode: isMaintenanceMode ?? false,
    isLoading,
    toggleMaintenance: toggleMutation.mutateAsync,
    isToggling: toggleMutation.isPending,
  };
};
