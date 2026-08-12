import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { getPublicProfile } from "../api/usersApi";

export function usePublicProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: () => getPublicProfile(userId),
    enabled: !!userId,
  });
}
