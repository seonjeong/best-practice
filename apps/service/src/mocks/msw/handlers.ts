// import { http, HttpResponse } from 'msw';

// export const handlers = [
//   http.get('/health', () => {
//     return HttpResponse.json({}, { status: 200 });
//   }),
// ];

import { fromOpenApi } from '@mswjs/source/open-api';

import { openapiSpec } from '@api-docs';

export const handlers = await fromOpenApi(JSON.parse(JSON.stringify(openapiSpec)));
