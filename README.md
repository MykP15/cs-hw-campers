# TravelTrucks 🚐

Вебзастосунок для оренди кемперів — фронтенд частина проєкту TravelTrucks.

## 🔗 Посилання

- [Демо на Vercel](https://travel-trucks.vercel.app) ← замінити після деплою
- [Репозиторій](https://github.com/your-username/travel-trucks) ← замінити

## ✨ Основні функції

- **Домашня сторінка** — банер із закликом до дії та переходом до каталогу
- **Каталог кемперів** — список з фільтрацією за локацією, типом кузова, двигуном та трансмісією
- **Пагінація Load More** — підвантаження по 4 картки з урахуванням фільтрів
- **Сторінка деталей** — повна інформація, галерея зображень, відгуки із зірками
- **Форма бронювання** — з валідацією та сповіщенням про успішне відправлення

## 🛠 Технічний стек

| Технологія | Призначення |
|---|---|
| Next.js 15 (App Router) | Фреймворк, маршрутизація |
| TypeScript | Типізація |
| TanStack Query | Кешування запитів, `useInfiniteQuery` для пагінації |
| CSS Modules | Стилізація компонентів |
| react-hook-form | Управління формою та валідація |
| react-hot-toast | Нотифікації |
| react-icons | Іконки |

## 🚀 Встановлення та запуск

```bash
# Клонувати репозиторій
git clone https://github.com/your-username/travel-trucks.git
cd travel-trucks

# Встановити залежності
npm install

# Запустити в режимі розробки
npm run dev
```

Відкрий [http://localhost:3000](http://localhost:3000) у браузері.

```bash
# Зібрати для продакшену
npm run build
npm start
```

## 📁 Структура проєкту

```
src/
├── app/                    # Next.js App Router сторінки
│   ├── page.tsx            # / — домашня сторінка
│   ├── catalog/
│   │   ├── page.tsx        # /catalog — каталог з фільтрами
│   │   └── [camperId]/
│   │       └── page.tsx    # /catalog/:id — деталі кемпера
├── components/             # UI компоненти
│   ├── Header/
│   ├── CamperCard/
│   ├── Filters/
│   ├── Gallery/
│   ├── ReviewList/
│   └── BookingForm/
├── lib/
│   └── api.ts              # Функції запитів до бекенду
├── providers/
│   └── QueryProvider.tsx   # TanStack Query провайдер
└── types/
    └── camper.ts           # TypeScript інтерфейси
```

## 🌐 API

Бекенд: `https://campers-api.goit.study`

| Endpoint | Метод | Опис |
|---|---|---|
| `/campers` | GET | Список кемперів (page, limit, фільтри) |
| `/campers/:id` | GET | Деталі кемпера |
| `/bookings` | POST | Створення бронювання |

## 👤 Автор

**Ваше ім'я** — [GitHub](https://github.com/your-username)
