import React from "react";
import { Navigate } from "react-router-dom";

const LOCAL_STORAGE_KEY_CANDIDATE_ID = 'candidateId'
interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

export const PrivateRoute = ({ component: Component, ...routeProps }: PrivateRouteProps) => {
  const candidateId: string | null = localStorage.getItem(LOCAL_STORAGE_KEY_CANDIDATE_ID);
  const { path } = routeProps;
  switch (path) {
    case "/":
      return <Component {...routeProps} />;
    default:
      if (!candidateId) {
        return <Navigate to="/" replace />
      }
      break;
  }

  return <Component {...routeProps} />;
};

export default LOCAL_STORAGE_KEY_CANDIDATE_ID