import { Camper, CampersResponse, CamperFilters, BookingData } from "@/types/camper";

const BASE_URL = "https://campers-api.goit.study";

// ─── GET /campers ────────────────────────────────────────────────────────────
export async function getCampers(
  filters: CamperFilters = {},
  page: number = 1
): Promise<CampersResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", "4");

  if (filters.location) params.set("location", filters.location);
  if (filters.form) params.set("form", filters.form);
  if (filters.transmission) params.set("transmission", filters.transmission);
  if (filters.engine) params.set("engine", filters.engine);

  const url = `${BASE_URL}/campers?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Помилка завантаження кемперів: ${res.status}`);

  const json = await res.json();

  // Debug — видалити після перевірки
  if (typeof window !== "undefined") {
    console.log("API keys:", Object.keys(json));
    console.log("API sample:", JSON.stringify(json).slice(0, 400));
  }

  if (Array.isArray(json)) return { items: json, total: json.length };

  const arrayKey = Object.keys(json).find((k) => Array.isArray(json[k]));
  if (arrayKey) {
    return {
      items: json[arrayKey],
      total: json.total ?? json.count ?? json[arrayKey].length,
    };
  }

  return { items: [], total: 0 };
}

// ─── GET /campers/{camperId} ──────────────────────────────────────────────────
export async function getCamperById(id: string): Promise<Camper> {
  const res = await fetch(`${BASE_URL}/campers/${id}`);
  if (!res.ok) throw new Error("Кемпер не знайдено");
  return res.json();
}

// ─── GET /campers/{camperId}/reviews ─────────────────────────────────────────
export async function getCamperReviews(camperId: string) {
  const res = await fetch(`${BASE_URL}/campers/${camperId}/reviews`);
  if (!res.ok) throw new Error("Помилка завантаження відгуків");
  return res.json(); // масив або { items: [...] } — з'ясуємо при першому запиті
}

// ─── POST /campers/{camperId}/booking-requests ────────────────────────────────
export async function createBooking(data: BookingData): Promise<void> {
  const { camperId, ...body } = data;
  const res = await fetch(`${BASE_URL}/campers/${camperId}/booking-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Помилка бронювання");
}
