import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { handleAuthenticatedUser, handleCheckAuth, handleUnauthenticatedUser } from '../../lib/auth.ts'
import unauthenticatedRoutes, { prefixes } from '../../data/unauthenticatedRoutes'
import Router from '../../Router'

const Root: React.FC = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const currentRoute = location.pathname

  // turns those routes that start with /workshop/ such as /workshop/deca into the normalized route of /workshop


  const normalizedRoute = prefixes.find(prefix => currentRoute.startsWith(`${prefix}/`))
    || currentRoute;
  

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await handleCheckAuth(currentRoute === "/admin" ? "admin" : "user");

      // If it's an unauthenticated route, skip auth
      if (unauthenticatedRoutes.includes(normalizedRoute)) {
        return <Router />;
      }

      else if (normalizedRoute == "/login" && auth) {
        return await handleAuthenticatedUser()
      } 

      else if (!auth) {
        return await handleUnauthenticatedUser()
      }
    };

    checkAuth();
  }, [currentRoute, navigate]);

  // if all if statements are not met, then just render the contents from the route (given by RouterManager)
  return <Router />;
};

export default Root