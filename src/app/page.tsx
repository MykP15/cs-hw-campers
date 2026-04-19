import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "TravelTrucks — Кемпери вашої мрії",
  description: "Знайдіть ідеальний кемпер для подорожі. Великий вибір, зручне бронювання.",
};

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog">
          <button className={styles.btn}>View Now</button>
        </Link>
      </div>
    </section>
  );
}
