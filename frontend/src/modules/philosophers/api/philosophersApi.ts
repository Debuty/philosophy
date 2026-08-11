import { apiClient } from "../../../api/client";
import type { ApiSuccess } from "../../../api/types";
import type {
  ListPhilosophersParams,
  PhilosopherBio,
  PhilosopherCard,
  PhilosophersListResult,
  PhilosophersPagination,
} from "../types";

type ListResponse = {
  data: PhilosopherCard[];
  pagination?: PhilosophersPagination;
};

export async function listPhilosophers(
  params: ListPhilosophersParams = {},
): Promise<PhilosophersListResult> {
  console.log(params.era)
  const { data } = await apiClient.get<ListResponse>("/philosophers", {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 12,
      ...(params.search?.trim() ? { search: params.search.trim() } : {}),
      ...(params.era ? { era: params.era } : {}),
      ...(params.school ? { school: params.school } : {}),
    },
  });

  return {
    data: data.data,
    pagination: data.pagination ?? {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 12,
      total: data.data.length,
      totalPages: 1,
    },
  };
}

export async function getFeaturedPhilosophers(
  limit = 3,
): Promise<PhilosopherCard[]> {
  const { data } = await apiClient.get<ListResponse>("/philosophers", {
    params: { featured: true, limit },
  });
  return data.data;
}

export async function getPhilosopherBio(id: number): Promise<PhilosopherBio> {
  const { data } = await apiClient.get<ApiSuccess<PhilosopherBio>>(
    `/philosophers/${id}/bio`,
  );
  return data.data;
}
