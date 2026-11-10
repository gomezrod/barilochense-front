export function relativeDate(value: string): string {
  const published = new Date(value).getTime();
  const hours = Math.max(1, Math.floor((Date.now() - published) / 3_600_000));
  if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
}

export function fallbackImage(event: Event): void {
  const image = event.currentTarget as HTMLImageElement;
  image.onerror = null;
  image.src =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420"%3E%3Crect width="640" height="420" fill="%23eef5fb"/%3E%3Cpath d="M170 300l105-120 70 80 55-65 100 105H170z" fill="%2375aadb" opacity=".55"/%3E%3Ccircle cx="430" cy="145" r="35" fill="%23fdc130" opacity=".75"/%3E%3C/svg%3E';
}
