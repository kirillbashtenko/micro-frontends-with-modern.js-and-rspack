import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

export default defineConfig({
  runtime: {
    router: true,
    state: true,
    masterApp: {},
  },
  source: {
    // automatically generated asynchronous boundary via Dynamic Import, allowing the page code to consume remote modules generated by the module federation.
    enableAsyncEntry: true,
  },
  output: {
    disableTsChecker: true,
  },
  tools: {
    rspack: (config, { rspack, appendPlugins }) => {
      appendPlugins([
        new rspack.container.ModuleFederationPlugin({
          name: 'host',
          remotes: {
            mfe2: 'mfe2@http://localhost:8082/static/js/remoteEntry.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ]);
    },
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    garfishPlugin(),
  ],
});