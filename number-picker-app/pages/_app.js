import { LogtoProvider, LogtoConfig, UserScope } from '@logto/react';

import '../styles/custom.scss'; // Import the custom SCSS file
import '@fortawesome/fontawesome-free/css/all.css';

const logtoConfig = {
  endpoint: 'https://pa1k4q.logto.app', // E.g. http://localhost:3001
  appId: 'qnx3iazaktvkyxrhsinv9',
  scopes: [
    UserScope.Email,
    UserScope.Phone,
    UserScope.CustomData,
    UserScope.Identities,
    UserScope.Organizations,
  ],
};

function MyApp({ Component, pageProps }) {
  return (
    <LogtoProvider config={logtoConfig}>
      <Component {...pageProps} />
    </LogtoProvider>
  );
}

export default MyApp;