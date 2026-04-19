"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/api";
import styles from "./BookingForm.module.css";

interface Props {
  camperId: string;
}

interface FormValues {
  name: string;
  email: string;
  date: string;
  comment?: string;
}

export default function BookingForm({ camperId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      await createBooking({ camperId, ...values });
      toast.success("Бронювання успішно відправлено! Ми зв'яжемось з вами.");
      reset();
    } catch {
      toast.error("Щось пішло не так. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.formWrap}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      {/* handleSubmit — з react-hook-form, вона сама перевіряє валідацію перед відправкою */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Name*"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            {...register("name", { required: "Введіть ваше ім'я" })}
          />
          {errors.name && (
            <span className={styles.errorMsg}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email*"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            {...register("email", {
              required: "Введіть email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Невірний формат email",
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorMsg}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="date"
            placeholder="Booking date*"
            className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
            {...register("date", { required: "Оберіть дату" })}
          />
          {errors.date && (
            <span className={styles.errorMsg}>{errors.date.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <textarea
            placeholder="Comment (optional)"
            className={`${styles.input} ${styles.textarea}`}
            {...register("comment")}
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Надсилання..." : "Send"}
        </button>
      </form>
    </div>
  );
}
