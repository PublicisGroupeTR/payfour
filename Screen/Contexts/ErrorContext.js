import React, { createContext, useState, useContext } from 'react';
import ErrorModal from '../Components/ErrorModal';
const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [errorCallback, setErrorCallback] = useState(null);

  const showError = (message, callback) => {
    setError(message);
    //if(callback) 
    // setErrorCallback(callback);
  };

  const hideError = () => {
    console.log("hideError");
    setError(null);
    //if(errorCallback) errorCallback();
  };

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
      {error && <ErrorModal message={error} onClose={hideError} />}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};