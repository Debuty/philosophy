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

type AvatarUploadResponse = {
  id: string;
  avatar_url: string | null;
};

export async function uploadMyAvatar(
  file: File,
): Promise<{ id: string; avatarUrl: string | null }> {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await apiClient.patch<ApiSuccess<AvatarUploadResponse>>(
    "/users/me/avatar",
    formData,
  );

  return {
    id: data.data.id,
    avatarUrl: data.data.avatar_url,
  };
}
