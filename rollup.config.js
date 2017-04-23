import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'

export default {
  format: 'umd',
  entry: 'index.js',
  dest: 'dist/paris.js',
  moduleName: 'paris',
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    buble(),
    cleanup()
  ]
}
