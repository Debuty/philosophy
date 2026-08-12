import { apiClient } from "../../../api/client";
import type { ApiSuccess } from "../../../api/types";
import type { PublicUserProfile } from "../types";

export async function getPublicProfile(
  userId: string,
): Promise<PublicUserProfile> {
  const { data } = await apiClient.get<ApiSuccess<PublicUserProfile>>(
    `/users/${userId}/profile`,
  );
  return data.data;
}
