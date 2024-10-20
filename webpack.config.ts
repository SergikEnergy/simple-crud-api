import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Configuration } from 'webpack';

const isDevMode = process.env.NODE_ENV === 'development';

const config: Configuration = {
  entry: resolve(__dirname, 'src', 'index.ts'),
  mode: isDevMode ? 'development' : 'production',
  target: 'node',
  devtool: isDevMode && 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        options: {
          configFile: resolve(__dirname, 'tsconfig.json'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [new CleanWebpackPlugin()],
  watch: isDevMode,
  output: {
    clean: true,
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
  },
};

export default config;
