import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";

interface Token {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const useToken = () => {
  const { data: validToken, status } = useQuery("accessToken", () =>
    localStorage.getItem("accessToken")
  );

  if (status === "loading") {
    // Loading state: You can return a loading indicator or null
    return null;
  }

  if (status === "error" || !validToken) {
    // Error state: Return null instead of throwing an error
    // console.error("Token not available");
    return null;
  }

  // Try to decode the token
  try {
    const decodedToken = jwtDecode(validToken);
    return decodedToken as Token;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null in case of decoding error
  }
};

export default useToken;
