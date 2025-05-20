import httpHeader from "../services/httpHeader";

export async function getMenuItems() {

  const response = await httpHeader.get("/auth/get-session")

  const authStatus = response.data.auth as boolean

  return [
    {
      display: "Forum",
      pathname: "/forum",
    },
    {
      display: "Question bank",
      pathname: "/questions",
    },
    {
      display: "Team",
      pathname: "/team",
    },
    {
      display: authStatus ? "Logout" : "Login",
      pathname: authStatus ? "/logout" : "/login",
    },
  ];
}
