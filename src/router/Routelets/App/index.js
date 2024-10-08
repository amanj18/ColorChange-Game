import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { eventTrackingHandler } from 'utils/analytics';

const App = () => {
  useEffect(() => {
    document.addEventListener('click', eventTrackingHandler);
    return () => {
      document.removeEventListener('click', eventTrackingHandler);
    };
  }, []);

  return <Outlet />;
};

export default App;
