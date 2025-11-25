import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const specPath = path.resolve(__dirname, '../dist/openapi.bundle.json');

async function main() {
  let raw: string;

  try {
    raw = await fs.readFile(specPath, 'utf-8');
  } catch (error) {
    console.error('❌ dist/openapi.bundle.json 이 없습니다. 먼저 "npm run bundle" 을 실행하세요.');
    process.exit(1);
  }

  const swaggerDocument = JSON.parse(raw);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`✅ Swagger UI: http://localhost:${PORT}/docs`);
  });
}

main().catch((error) => {
  console.error('❌ 서버 실행 중 에러:', error);
  process.exit(1);
});
