import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import {
  getFeaturedPhilosophers,
  getPhilosopherBio,
  listPhilosophers,
} from "../api/philosophersApi";
import type { ListPhilosophersParams } from "../types";

export function usePhilosophersList(filters: ListPhilosophersParams) {
  return useQuery({
    queryKey: queryKeys.philosophers.list(filters),
    queryFn: () => listPhilosophers(filters),
  });
}

export function useFeaturedPhilosophers(limit = 3) {
  return useQuery({
    queryKey: queryKeys.philosophers.featured(limit),
    queryFn: () => getFeaturedPhilosophers(limit),
  });
}

export function usePhilosopherBio(id: number | null) {
  return useQuery({
    queryKey: queryKeys.philosophers.bio(id ?? 0),
    queryFn: () => getPhilosopherBio(id!),
    enabled: id != null && id > 0,
  });
}
