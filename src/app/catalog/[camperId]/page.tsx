"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";
import { getCamperById, getCamperReviews } from "@/lib/api";
import Gallery from "@/components/Gallery/Gallery";
import ReviewList from "@/components/ReviewList/ReviewList";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./page.module.css";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

function formatForm(form: string): string {
  const map: Record<string, string> = {
    alcove: "Alcove",
    fullyIntegrated: "Fully Integrated",
    panelTruck: "Panel Truck",
    van: "Van",
  };
  return map[form] ?? form;
}

export default function CamperDetailPage({
  params,
}: {
  params: Promise<{ camperId: string }>;
}) {
  const { camperId } = use(params);

  // Запит даних кемпера
  const { data: camper, isLoading, isError } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
  });

  // Окремий запит для відгуків — GET /campers/{camperId}/reviews
  const { data: reviewsData } = useQuery({
    queryKey: ["camper-reviews", camperId],
    queryFn: () => getCamperReviews(camperId),
    enabled: !!camperId,
  });

  // Відгуки можуть прийти як масив або як { items: [...] }
  const reviews = Array.isArray(reviewsData)
    ? reviewsData
    : reviewsData?.items ?? camper?.reviews ?? [];

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        Завантаження...
      </div>
    );
  }

  if (isError || !camper) {
    return (
      <div className={styles.error}>
        Не вдалося завантажити дані кемпера.
      </div>
    );
  }

  const reviewCount = reviews.length;

  const features: string[] = [];
  if (camper.transmission) features.push(
    camper.transmission.charAt(0).toUpperCase() + camper.transmission.slice(1)
  );
  if (camper.AC) features.push("AC");
  if (camper.bathroom) features.push("Bathroom");
  if (camper.kitchen) features.push("Kitchen");
  if (camper.TV) features.push("TV");
  if (camper.radio) features.push("Radio");
  if (camper.refrigerator) features.push("Refrigerator");
  if (camper.microwave) features.push("Microwave");
  if (camper.gas) features.push("Gas");
  if (camper.water) features.push("Water");
  if (camper.engine) features.push(
    camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)
  );
  if (camper.form) features.push(formatForm(camper.form));

const images =
  Array.isArray(camper.gallery)
    ? camper.gallery.map((img: any) =>
        typeof img === "string" ? img : img?.original
      )
    : [];
  
  console.log("CAMPER:", camper);
console.log("IMAGE:", camper.coverImage);
  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/catalog">Catalog</Link>
        <span>/</span>
        <span>{camper.name}</span>
      </nav>

      {/* Верхня секція */}
      <div className={styles.topSection}>
        <Gallery images={images} name={camper.name} />

        <div className={styles.infoBlock}>
          <h1 className={styles.name}>{camper.name}</h1>

          <div className={styles.metaRow}>
            <span className={styles.rating}>
              <FaStar className={styles.star} />
              {camper.rating?.toFixed(1) ?? "—"}
              <span className={styles.reviews}>({reviewCount} Reviews)</span>
            </span>
            <span className={styles.location}>
              <FaMapMarkerAlt />
              {camper.location}
            </span>
          </div>

          <p className={styles.price}>€{camper.price?.toLocaleString()}</p>
          <p className={styles.description}>{camper.description}</p>
        </div>
      </div>

      {/* Деталі */}
      <div className={styles.detailsSection}>
        <h2 className={styles.sectionTitle}>Vehicle details</h2>

        <div className={styles.featureTags}>
          {features.map((f) => (
            <span key={f} className={styles.featureTag}>{f}</span>
          ))}
        </div>

        <table className={styles.specTable}>
          <tbody>
            {camper.form && <tr><td>Form</td><td>{formatForm(camper.form)}</td></tr>}
            {camper.length && <tr><td>Length</td><td>{camper.length}</td></tr>}
            {camper.width && <tr><td>Width</td><td>{camper.width}</td></tr>}
            {camper.height && <tr><td>Height</td><td>{camper.height}</td></tr>}
            {camper.tank && <tr><td>Tank</td><td>{camper.tank}</td></tr>}
            {camper.consumption && <tr><td>Consumption</td><td>{camper.consumption}</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Відгуки + форма */}
      <div className={styles.bottomSection}>
        <div className={styles.reviewsBlock}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <ReviewList reviews={reviews} />
        </div>

        <BookingForm camperId={camper.id} />
      </div>
    </div>
  );
}
