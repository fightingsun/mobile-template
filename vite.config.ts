import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VarletUIResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/store'],
        vueTemplate: true,
        resolvers: [VarletUIResolver()],
      }),
      Components({
        resolvers: [VarletUIResolver()],
        dts: 'src/components.d.ts',
      }),
    ],
    server: {
      open: true,
      host: '0.0.0.0',
      proxy: {
        ['/' + env.VITE_API_PREFIX]: {
          changeOrigin: true,
          target: env.VITE_API_URL + ':' + env.VITE_API_PORT,
        },
        ['/' + env.VITE_IMAGE_URL]: {
          changeOrigin: true,
          target: env.VITE_API_URL + ':' + env.VITE_API_PORT,
        },
      },
    },
  };
});
