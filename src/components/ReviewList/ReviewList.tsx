import { CamperReview } from "@/types/camper";
import styles from "./ReviewList.module.css";
import { FaStar } from "react-icons/fa";

interface Props {
  reviews: CamperReview[];
}

export default function ReviewList({ reviews }: Props) {
  if (!reviews || reviews.length === 0) {
    return <p style={{ color: "var(--color-text-muted)" }}>Відгуків поки немає.</p>;
  }

  return (
    <div className={styles.list}>
      {reviews.map((review, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.header}>
            {/* Аватар — перша літера імені */}
            <div className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{review.reviewer_name}</span>
              {/* П'ятизіркова шкала */}
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`${styles.star} ${star <= review.reviewer_rating ? styles.starFilled : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
