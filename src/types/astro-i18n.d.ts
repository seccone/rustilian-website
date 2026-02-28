declare module 'astro:i18n' {

  export function getRelativeLocaleUrl(locale: string, path?: string): string;

  export function getAbsoluteLocaleUrl(locale: string, path?: string): string;
}
