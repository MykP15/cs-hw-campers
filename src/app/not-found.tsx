import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "16px",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "80px", fontWeight: 800, color: "var(--color-accent)", lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "var(--color-text)" }}>
        Сторінку не знайдено
      </h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "16px" }}>
        Можливо, вона була переміщена або не існує.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          padding: "14px 36px",
          background: "var(--color-accent)",
          color: "#fff",
          borderRadius: "100px",
          fontWeight: 600,
          fontSize: "15px",
        }}
      >
        На головну
      </Link>
    </div>
  );
}
