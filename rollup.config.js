import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    typescript(),
    // typescript({ objectHashIgnoreUnknownHack: true })
    postcss({
      extensions: [ '.css' ],
      extract: 'styles.css'
    }),
  ],
  external: ['react', 'react-dom']
}