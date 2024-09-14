import React, { Suspense } from 'react';
import { useModuleApps } from '@modern-js/plugin-garfish/runtime';
import { defineConfig } from '@modern-js/runtime';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from '@modern-js/runtime/router';
import MFE2Component from 'mfe2/MFE2Component';
import styled from '@modern-js/runtime/styled';

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #333;
`;

const Loading = styled.div`
  font-size: 1.2em;
  color: #666;
`;

const App: React.FC = () => {
  const { MApp } = useModuleApps();
  return (
    <Router>
      <AppContainer>
        <Title>Welcome to the Shell Application</Title>
        <MFE2Component />
        <Suspense fallback={<Loading>Loading...</Loading>}>
          <MApp />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div>
                    <Link to="/mfe1">MFE1</Link>
                  </div>
                </>
              }
            />
          </Routes>
        </Suspense>
      </AppContainer>
    </Router>
  );
};

export default defineConfig(App, {
  masterApp: {
    manifest: {
      getAppList: async () => {
        return [
          {
            name: 'mfe1',
            entry: 'http://localhost:8081/index.js',
            activeWhen: path => path.includes('mfe1'),
          },
        ];
      },
    },
  },
});
