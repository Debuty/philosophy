import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import type { AuthUser } from "../../auth/types";
import { uploadMyAvatar } from "../api/usersApi";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

/** Returns an error message, or null when the file is valid. */
export function getAvatarFileError(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Please choose an image file";
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return "Image must be 5MB or smaller";
  }
  return null;
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMyAvatar,
    onSuccess: (result) => {
      queryClient.setQueryData<AuthUser>(queryKeys.auth.session(), (old) =>
        old ? { ...old, avatarUrl: result.avatarUrl } : old,
      );
      toast.success("Avatar updated");
    },
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to update avatar",
      );
    },
  });
}
