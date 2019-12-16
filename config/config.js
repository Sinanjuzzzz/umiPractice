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
  proxy: {
    "/api": {
      "target": "http://45.32.103.95:8000/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
}

export default config;
