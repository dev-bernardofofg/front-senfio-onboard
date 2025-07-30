import { useAuth } from "@/app/(contexts)/auth.context";

export const useAuthorization = () => {
  const { user } = useAuth();

  const isStaff = user?.is_staff || false;
  const isNonStaff = !isStaff;
  const isAuthenticated = !!user;

  return {
    isStaff,
    isNonStaff,
    isAuthenticated,
    user,
  };
};
