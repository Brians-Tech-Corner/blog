import '@testing-library/jest-dom';
import React from 'react';

// Polyfill React.act for React 19 compatibility with testing-library 16.x
// This works around the React.act is not a function error
if (!React.act) {
  React.act = (callback: () => void | Promise<void>) => {
    return Promise.resolve().then(callback);
  };
}
