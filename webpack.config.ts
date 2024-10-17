import { Configuration } from 'webpack';
import { dirname, resolve } from 'path';

const __dirname = dirname(import.meta.url);

const isDevMode = process.env.NODE_ENV === 'development';

const config: Configuration = {
  entry: { bundle: resolve(__dirname, 'src', 'index.ts') },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  watch: isDevMode,
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
};

export default config;
