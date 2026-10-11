const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// Helper to fetch from primary with fallbacks
async function fetchWithFallback(endpoint, options = {}) {
  let lastError = null;

  for (const baseUrl of BASE_URLS) {
    try {
      const url = `${baseUrl}${endpoint}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
        ...options,
      });

      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch from ${endpoint}: ${lastError?.message || "All endpoints failed"}`);
}

// Convert English numbers to Bengali numerals
export function toBengaliNumber(num) {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

// Format currency in Bengali (e.g. "১,৮৫০ টাকা")
export function formatBengaliCurrency(amount) {
  if (amount === null || amount === undefined) return "০ টাকা";
  const num = typeof amount === "number" ? amount : parseFloat(amount) || 0;
  // Format with thousand separators then convert to Bengali digits
  const parts = num.toLocaleString("en-US").split(".");
  const intPart = toBengaliNumber(parts[0]);
  if (parts.length > 1) {
    return `${intPart}.${toBengaliNumber(parts[1])} টাকা`;
  }
  return `${intPart} টাকা`;
}

// Format percentage in Bengali
export function formatBengaliPercent(pct) {
  if (pct === null || pct === undefined) return "০.০%";
  const num = Math.abs(Number(pct));
  return `${toBengaliNumber(num.toFixed(1))}%`;
}

// Format unit label in Bengali
export function formatBengaliUnit(unit) {
  if (!unit) return "প্রতি কেজি";
  const map = {
    kg: "প্রতি কেজি",
    "কেজি": "প্রতি কেজি",
    liter: "প্রতি লিটার",
    "লিটার": "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    "ডজন": "প্রতি ডজন",
    piece: "প্রতি পিস",
    "পিস": "প্রতি পিস",
    "হালি": "প্রতি হালি",
    gm: "প্রতি গ্রাম",
    "গ্রাম": "প্রতি গ্রাম",
  };
  return map[unit.toLowerCase()] || `প্রতি ${unit}`;
}

// Get current date in Bengali
export function getBanglaDate(date = new Date()) {
  try {
    return date.toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "রবিবার, ১১ অক্টোবর, ২০২৬";
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const data = await fetchWithFallback("/categories");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch single category
export async function getCategory(slug) {
  try {
    const data = await fetchWithFallback(`/categories/${slug}`);
    if (data && !data.error) return data;
  } catch {}

  // Fallback: search in all categories
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug || c.id === slug) || null;
}

// Fetch all products or by category
export async function getProducts(categorySlug = null) {
  try {
    const endpoint = categorySlug ? `/products?category=${categorySlug}` : "/products";
    const data = await fetchWithFallback(endpoint);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch a single product by slug or id
export async function getProduct(slugOrId) {
  try {
    // If it's a number, try direct endpoint first
    if (/^\d+$/.test(slugOrId)) {
      const direct = await fetchWithFallback(`/products/${slugOrId}`);
      if (direct && !direct.error) return direct;
    }
  } catch {}

  // Fallback: fetch all and find by slug or ID
  const allProducts = await getProducts();
  const found = allProducts.find(
    (p) =>
      p.slug === slugOrId ||
      p.id?.toString() === slugOrId?.toString() ||
      encodeURIComponent(p.slug) === encodeURIComponent(slugOrId)
  );

  if (!found) return null;

  // Try fetching single product details with the found ID to get markets if not populated
  if (found.markets && found.markets.length > 0) {
    return found;
  }

  try {
    const detailed = await fetchWithFallback(`/products/${found.id}`);
    if (detailed && !detailed.error) return detailed;
  } catch {}

  return found;
}

// Get top 6 risers
export function getTopRisers(products, count = 6) {
  if (!Array.isArray(products)) return [];
  return products
    .filter((p) => p.change?.dir === "up" && typeof p.change?.pct === "number")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);
}

// Get top 6 fallers (largest drops by magnitude)
export function getTopFallers(products, count = 6) {
  if (!Array.isArray(products)) return [];
  return products
    .filter((p) => p.change?.dir === "down" && typeof p.change?.pct === "number")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}
