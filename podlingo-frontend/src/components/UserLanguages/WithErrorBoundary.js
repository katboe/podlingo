import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import UserLanguages from './index';

const UserLanguagesWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <UserLanguages />
    </ErrorBoundary>
  );
};

export default UserLanguagesWithErrorBoundary; 