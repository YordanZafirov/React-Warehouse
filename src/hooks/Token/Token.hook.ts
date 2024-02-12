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
    return null;
  }

  if (status === "error" || !validToken) {
    return null;
  }

  // Try to decode the token
  try {
    const decodedToken: Token = jwtDecode(validToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null in case of decoding error
  }
};

export default useToken;
