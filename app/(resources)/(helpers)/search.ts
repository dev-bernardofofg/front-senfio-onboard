export function buildSearchString(
  filters: Record<string, string | undefined>
): string | undefined {
  // Retorna apenas o valor de search, se existir
  return filters.search || undefined;
}
