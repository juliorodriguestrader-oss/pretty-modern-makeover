import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMaintenanceMode = () => {
  const queryClient = useQueryClient();

  const { data: isMaintenanceMode, isLoading } = useQuery({
    queryKey: ["maintenance-mode"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "maintenance_mode")
        .maybeSingle();
      return data?.value === "true";
    },
    staleTime: 30000,
  });

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
