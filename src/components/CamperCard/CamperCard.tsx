import { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";
import { FaStar, FaMapMarkerAlt, FaGasPump, FaCog, FaCarSide } from "react-icons/fa";

interface Props {
  camper: Camper;
}

function formatForm(form: string): string {
  const map: Record<string, string> = {
    alcove: "Alcove",
    fullyIntegrated: "Fully Integrated",
    panelTruck: "Panel Truck",
    van: "Van",
  };
  return map[form] ?? form;
}

function resolveImageUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("//")) return `https:${src}`;
  return `https://campers-api.goit.study${src.startsWith("/") ? "" : "/"}${src}`;
}

export default function CamperCard({ camper }: Props) {
  const reviewCount = camper.reviews?.length ?? 0;
  const firstImage = camper.coverImage;

  return (
    <div className={styles.card}>
      {/* Зображення */}
      {firstImage ? (
        <img
          src={firstImage}
          alt={camper.name}
          className={styles.image}
          onError={(e) => {
            // Якщо не завантажилось — показуємо сірий блок
            const el = e.target as HTMLImageElement;
            el.style.background = "var(--color-tag-bg)";
            el.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="; // прозорий пікселb
          }}
        />
      ) : (
        <div className={styles.image} style={{ background: "var(--color-tag-bg)" }} />
      )}

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h2 className={styles.name}>{camper.name}</h2>
          <span className={styles.price}>€{camper.price?.toLocaleString()}</span>
        </div>

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

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tags}>
          {camper.engine && (
            <span className={styles.tag}>
              <FaGasPump />
              {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
            </span>
          )}
          {camper.transmission && (
            <span className={styles.tag}>
              <FaCog />
              {camper.transmission.charAt(0).toUpperCase() + camper.transmission.slice(1)}
            </span>
          )}
          {camper.form && (
            <span className={styles.tag}>
              <FaCarSide />
              {formatForm(camper.form)}
            </span>
          )}
        </div>

        <div className={styles.btnRow}>
          <a href={`/catalog/${camper.id}`} target="_blank" rel="noopener noreferrer">
            <button className={styles.showMoreBtn}>Show more</button>
          </a>
        </div>
      </div>
    </div>
  );
}
