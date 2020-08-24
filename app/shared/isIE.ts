export function isIE(): boolean {
  if (!!(window as any).ActiveXObject || 'ActiveXObject' in window) {
    return true;
  }
  return false;
}
