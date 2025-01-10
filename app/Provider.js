"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

const Provider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
      console.log('its working')
    }
  }, [user]);

  const isNewUser = async () => {
    const response = await fetch('/api/check-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user?.primaryEmailAddress?.emailAddress,
        fullName: user.fullName,
        imageUrl: user?.imageUrl,
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('User added to the database');
    }
  };

  return <div>{children}</div>;
};

export default Provider;
