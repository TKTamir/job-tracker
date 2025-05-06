import {jwtDecode} from 'jwt-decode';
import {DecodedToken, User} from '../../state/types/auth';

export function decodeTokenToUser(token: string): User {
  const decoded = jwtDecode<DecodedToken>(token);

  if (!decoded.exp) {
    throw new Error("Invalid token");
  }

  if (decoded.exp < Date.now() / 1000) {
    throw new Error("Token expired");
  }

  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    token,
  };
}

export async function handleAuthQuery(queryFulfilled: Promise<{ data: User }>) {
  try {
    const {data} = await queryFulfilled;
    localStorage.setItem('token', data.token);
  } catch (err) {
    console.error("Auth query failed:", err);
  }
}