import routes from './routes';

const config = {
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'umitest',
      dll: false,
    }],
  ],
  routes,
}

export default config;
