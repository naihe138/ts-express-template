const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  outDir: './dist',
  esbuild: {
    minify: false,
    platform: 'node',
    target: 'esnext',
    plugins: [esbuildPluginTsc()],
  },
  assets: {
    baseDir: 'src',
    outDir: './dist',
    filePatterns: ['**/*.json'],
  },
};
