import React from 'react';

interface OrganizerWelcomeProps {
  name: string;
}

export const OrganizerWelcomeEmail: React.FC<OrganizerWelcomeProps> = ({ name }) => {
  return (
    <div className="font-sans text-sm text-gray-700">
      <p className="text-base font-semibold mb-2">Welcome {name}!</p>
      <p className="mb-4">
        Ready to create unforgettable events? We're thrilled to have you as an organizer.
        Start listing your events and reach thousands of attendees today!
      </p>
    </div>
  );
};
