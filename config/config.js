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
      "target": "http://39.107.238.66:5000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
}

export default config;
