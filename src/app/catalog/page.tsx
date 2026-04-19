"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getCampers } from "@/lib/api";
import { CamperFilters } from "@/types/camper";
import Filters from "@/components/Filters/Filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import styles from "./page.module.css";

// Скелетон — заглушка поки завантажуються дані
function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine} style={{ width: "60%" }} />
        <div className={styles.skeletonLine} style={{ width: "40%" }} />
        <div className={styles.skeletonLine} style={{ width: "90%" }} />
        <div className={styles.skeletonLine} style={{ width: "80%" }} />
      </div>
    </div>
  );
}

export default function CatalogPage() {
  // Фільтри зберігаємо в стані — коли змінюються, запит перезапускається
  const [filters, setFilters] = useState<CamperFilters>({});

  // useInfiniteQuery — ключова частина для пагінації Load More
  const {
    data,
    fetchNextPage,    // функція для завантаження наступної сторінки
    hasNextPage,      // чи є ще сторінки?
    isFetchingNextPage, // завантажується наступна сторінка?
    isLoading,        // перше завантаження
    isError,
    error,
  } = useInfiniteQuery({
    // queryKey містить фільтри — при їх зміні запит скидається і перезапускається
    queryKey: ["campers", filters],

    // queryFn — функція запиту. pageParam — номер поточної сторінки
    queryFn: ({ pageParam = 1 }) => getCampers(filters, pageParam as number),

    // Початкова сторінка
    initialPageParam: 1,

    // Повертає номер наступної сторінки або undefined якщо більше немає
    getNextPageParam: (lastPage, allPages) => {
      // Захисна перевірка: API може повернути items або data або масив напряму
      const items = lastPage?.items ?? (Array.isArray(lastPage) ? lastPage : []);
      const total = lastPage?.total ?? 0;
      const loaded = allPages.reduce((acc, p) => {
        const pageItems = p?.items ?? (Array.isArray(p) ? p : []);
        return acc + (pageItems?.length ?? 0);
      }, 0);
      if (items.length > 0 && loaded < total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  // Збираємо всі завантажені картки — підтримуємо різні формати відповіді API
  const campers = data?.pages.flatMap((page) => {
    return page?.items ?? (Array.isArray(page) ? page : []);
  }) ?? [];

  const handleSearch = (newFilters: CamperFilters) => {
    setFilters(newFilters);
  };
  console.log(campers[0])
  return (
    <div className={styles.page}>
      {/* Breadcrumb навігація */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Catalog</span>
      </nav>

      <div className={styles.layout}>
        {/* Бічна панель з фільтрами */}
        <Filters onSearch={handleSearch} />

        {/* Список кемперів */}
        <div style={{ flex: 1 }}>
          {isError && (
            <div className={styles.error}>
              Помилка завантаження: {(error as Error).message}
            </div>
          )}

          {isLoading ? (
            // Показуємо скелетони поки завантажується
            <div className={styles.list}>
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              {campers.length === 0 ? (
                <div className={styles.empty}>
                  Кемперів за вашими фільтрами не знайдено
                </div>
              ) : (
                <div className={styles.list}>
                  {campers.map((camper) => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))}
                </div>
              )}

              {/* Кнопка Load More */}
              {hasNextPage && (
                <div className={styles.loadMoreWrap}>
                  <button
                    className={styles.loadMoreBtn}
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Завантаження..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
