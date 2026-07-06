import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

// FSD layer dependency direction: app -> views -> widgets -> features -> entities -> shared.
// Each layer bans importing itself/other slices in the same layer and every layer above it,
// and may only reach lower layers through their public API (bare slice import, not a deep path).
const fsdLayerRules = [
  {
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/widgets/**',
                '@/features/**',
                '@/entities/**',
                '@/shared/**',
                '@/views/*/**',
              ],
              message:
                'app 레이어는 views의 공개 API(예: @/views/login)만 임포트할 수 있습니다 (FSD 레이어 규칙).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/views/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/**', '@/views/**'],
              message:
                'views는 app을 임포트할 수 없고, 다른 view를 임포트할 수 없습니다 (FSD 레이어 규칙).',
            },
            {
              group: ['@/widgets/*/**', '@/features/*/**', '@/entities/*/**'],
              message:
                '슬라이스 내부 경로가 아닌 공개 API를 통해 임포트하세요 (예: @/widgets/page-header).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/**', '@/views/**', '@/widgets/**'],
              message:
                'widgets는 app/views를 임포트할 수 없고, 다른 widget을 임포트할 수 없습니다 (FSD 레이어 규칙).',
            },
            {
              group: ['@/features/*/**', '@/entities/*/**'],
              message:
                '슬라이스 내부 경로가 아닌 공개 API를 통해 임포트하세요 (예: @/features/login).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/**', '@/views/**', '@/widgets/**', '@/features/**'],
              message:
                'features는 상위 레이어(app/views/widgets)를 임포트할 수 없고, 다른 feature를 임포트할 수 없습니다 (FSD 레이어 규칙).',
            },
            {
              group: ['@/entities/*/**'],
              message:
                '슬라이스 내부 경로가 아닌 공개 API를 통해 임포트하세요 (예: @/entities/user).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/**', '@/views/**', '@/widgets/**', '@/features/**', '@/entities/**'],
              message:
                'entities는 상위 레이어를 임포트할 수 없고, 다른 entity를 임포트할 수 없습니다 (FSD 레이어 규칙).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/**', '@/views/**', '@/widgets/**', '@/features/**', '@/entities/**'],
              message:
                'shared는 도메인 지식이 없는 레이어입니다. 상위 레이어를 임포트할 수 없습니다 (FSD 레이어 규칙).',
            },
          ],
        },
      ],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  ...fsdLayerRules,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Generated test/build reports:
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
  ]),
]);

export default eslintConfig;
