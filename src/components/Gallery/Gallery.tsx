"use client";

import { useState } from "react";
import styles from "./Gallery.module.css";

interface Props {
  images: string[];
  name: string;
}

// Безопасное преобразование URL
function resolveImageUrl(src: unknown): string {
  if (typeof src !== "string") return "";

  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("//")) return `https:${src}`;

  return `https://campers-api.goit.study${
    src.startsWith("/") ? "" : "/"
  }${src}`;
}

export default function Gallery({ images, name }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Защита от кривых данных
  const safeImages = Array.isArray(images)
    ? images.filter((img) => typeof img === "string" && img.length > 0)
    : [];

  if (safeImages.length === 0) {
    return (
      <div className={styles.placeholder}>
        <span>Фото відсутні</span>
      </div>
    );
  }

  const currentSrc = resolveImageUrl(safeImages[activeIndex]);

  return (
    <div className={styles.gallery}>
      {/* Основное изображение */}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={`${name} — фото ${activeIndex + 1}`}
        className={styles.mainImage}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Миниатюры */}
      {safeImages.length > 1 && (
        <div className={styles.thumbs}>
          {safeImages.map((src, i) => {
            const resolved = resolveImageUrl(src);

            return (
              <img
                key={i}
                src={resolved}
                alt={`Мініатюра ${i + 1}`}
                className={`${styles.thumb} ${
                  i === activeIndex ? styles.thumbActive : ""
                }`}
                onClick={() => setActiveIndex(i)}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0.2";
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}