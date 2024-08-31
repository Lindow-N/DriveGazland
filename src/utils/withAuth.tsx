import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

const withAuth = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuth;
