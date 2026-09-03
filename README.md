# Notes

SPA для заметок с todo-списками. Nuxt 4 (SPA, TypeScript strict), Pinia, SCSS, FSD.

## Команды

```bash
npm run dev         # dev-сервер, http://localhost:3000
npm run build       # прод-сборка
npm run test        # unit-тесты
npm run lint        # ESLint
npm run format      # Prettier
npm run typecheck   # vue-tsc (strict)
```

## Docker

```bash
docker compose up --build                            # prod, http://localhost:3000
docker compose -f docker-compose.dev.yml up --build  # dev с HMR
```
