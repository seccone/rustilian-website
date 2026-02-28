import { labels } from '@/i18n/ui';

const defaultLang = 'en';

type TranslationKey = keyof (typeof labels)[typeof defaultLang];

export function useTranslations(lang: keyof typeof labels) {
  return function translate(key: TranslationKey) {
    return (labels[lang] as Record<string, string>)[key] || labels[defaultLang][key];
  }
}