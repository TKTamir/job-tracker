import {jwtDecode} from 'jwt-decode';
import {DecodedToken, User} from '../../state/types/auth';

export function decodeTokenToUser(token: string): User {
  const decoded = jwtDecode<DecodedToken>(token);
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