import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../context/UserContext";

const withAuth = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const { user, loading } = useUser();
    const router = useRouter();
    const pathname = usePathname(); // Récupère l'URL actuelle

    useEffect(() => {
      if (!loading) {
        if (!user) {
          // Pas connecté => redirection vers la page de connexion
          router.push("/");
        } else if (!user.isValidated && pathname !== "/account-validation") {
          // Connecté mais non validé => redirection vers la page de validation
          router.push("/account-validation");
        }
      }
    }, [user, loading, router, pathname]);

    if (
      loading ||
      !user ||
      (!user.isValidated && pathname !== "/account-validation")
    ) {
      return null; // On affiche rien tant que l'utilisateur n'est pas validé ou chargé
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuth;
