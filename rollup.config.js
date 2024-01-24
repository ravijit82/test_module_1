/* eslint-disable import/no-extraneous-dependencies */
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true },
    { file: pkg.module, format: 'esm', sourcemap: true },
  ],
  plugins: [
    peerDepsExternal(),
    image(),
    resolve({ extensions: EXTENSIONS, preferBuiltins: false }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx'],
      exclude: 'node_modules/**', // only transpile our source code
      presets: [
        ['@babel/preset-env', { modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    }),
    postcss({
      plugins: [],
    }),
    commonjs({ include: /node_modules/ }),
    terser(),
  ],
};
