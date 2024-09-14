import { appTools, defineConfig } from '@modern-js/app-tools';

export default defineConfig({
  server: {
    port: 8082,
  },
  source: {
    enableAsyncEntry: true,
  },
  plugins: [appTools({ bundler: 'rspack' })],
  tools: {
    rspack: (config, { rspack, appendPlugins }) => {
      // just to remove noise form ts
      if (config.output) {
        config.output.publicPath = 'auto';
        config.output.uniqueName = 'mfe2';
      } else {
        config.output = {
          publicPath: 'auto',
          uniqueName: 'mfe2',
        };
      }

      if (config.optimization) {
        delete config.optimization.splitChunks;
        delete config.optimization.runtimeChunk;
      }

      appendPlugins([
        new rspack.container.ModuleFederationPlugin({
          name: 'mfe2',
          library: { type: 'var', name: 'mfe2' },
          filename: 'static/js/remoteEntry.js',
          exposes: {
            './MFE2Component': './src/MFE2Component.tsx',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ]);
    },
  },
});
