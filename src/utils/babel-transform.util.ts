import { transform, BabelFileResult, TransformOptions } from 'babel-core';

export default function transformJSX(jsx: string): BabelFileResult['code'] {
  const options = {
    babelrc: false,
    presets: ['babel-preset-env', 'babel-preset-react'],
    plugins: ['babel-plugin-syntax-jsx'],
  } as TransformOptions;

  return transform(jsx, options).code;
}
