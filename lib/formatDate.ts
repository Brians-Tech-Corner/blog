export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Convert YYYY-MM-DD date to ISO 8601 datetime format
 * Validates and ensures the date is in proper W3C Datetime format for sitemaps
 * @param dateString - Date in YYYY-MM-DD format or already in ISO format
 * @returns ISO 8601 datetime string (e.g., 2025-12-14T00:00:00.000Z)
 * @throws Error if date is invalid
 */
export function toISODateTime(dateString: string): string {
  // If already in ISO format with timezone, return as-is
  if (dateString.includes('T')) {
    return dateString;
  }

  // Validate YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    throw new Error(`Invalid date format: ${dateString}. Expected YYYY-MM-DD`);
  }

  // Convert YYYY-MM-DD to ISO 8601 datetime at midnight UTC
  const date = new Date(`${dateString}T00:00:00.000Z`);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${dateString}`);
  }

  return date.toISOString();
}
