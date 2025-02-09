"use client"
import { createContext, useState } from 'react';

export const UserDetailContext = createContext();

export function UserDetailProvider({ children }) {
  const [userDetail, setUserDetail] = useState({
    name: '',
    email: '',
    image: '',
    // Add any other user details you want to track
  });

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}
