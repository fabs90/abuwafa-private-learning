"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

const withRoleGuard = (Component, allowedRoles) => {
  const WrappedComponent = (props) => {
    const router = useRouter();
    const userRole = Cookies.get("role");

    useEffect(() => {
      if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
        // Redirect user to a forbidden or login page
        router.push("/403"); // 403 Forbidden page or redirect to login
      }
    }, [userRole, router]);

    // Render component only if role is allowed
    if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
      return null; // Optional loading spinner
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withRoleGuard(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withRoleGuard;
