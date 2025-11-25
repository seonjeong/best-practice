import { defineConfig } from 'orval';

import { openapiSpec } from '../../packages/api-docs/src';

export default defineConfig({
  'backend-api': {
    input: {
      target: openapiSpec,
    },
    output: {
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      target: 'src/apis/generated/api',
      schemas: 'src/apis/generated/model',
      prettier: true,
      clean: true,
      override: {
        mutator: {
          path: 'src/apis/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          useInfinite: false,
        },
      },
    },
  },
});
