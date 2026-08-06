import React from 'react';
import './Auth.scss';
import { debugLog } from '../../utils/debug';

const Auth: React.FC = () => {
  debugLog('Auth');
  return (
    <div className="auth">
      <h1>Authentication</h1>
    </div>
  );
};

export default Auth;
