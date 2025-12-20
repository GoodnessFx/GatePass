import React from 'react';

interface AttendeeWelcomeProps {
  name: string;
}

export const AttendeeWelcomeEmail: React.FC<AttendeeWelcomeProps> = ({ name }) => {
  return (
    <div className="font-sans text-sm text-gray-700">
      <p className="text-base font-semibold mb-2">Welcome {name}!</p>
      <p className="mb-4">
        Welcome to the ultimate event experience! Get ready to discover, attend, and collect memories from the best events around you.
      </p>
    </div>
  );
};
