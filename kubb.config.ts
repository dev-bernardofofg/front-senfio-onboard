import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig(() => {
  return {
    input: {
      path: './schema.yaml',
    },
    output: {
      path: './lib/generated',
      clean: true,
    },
    plugins: [
      pluginOas({
        generators: [],
        validate: false,
      }),
      pluginTs({
        output: {
          path: 'models',
        },
      }),
      pluginClient({
        output: {
          path: '.',
        },
        importPath: '../client.ts',
        dataReturnType: 'full',
        pathParamsType: 'object',
      }),
      pluginReactQuery({
        output: {
          path: './hooks',
        },
        paramsType: 'inline',
        pathParamsType: 'object',
        suspense: false,

        client: {
          dataReturnType: 'full',
          importPath: '../../client.ts',
        },
      }),
    ],
  }
})
