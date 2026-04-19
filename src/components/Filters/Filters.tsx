"use client";

import { useState } from "react";
import { CamperFilters } from "@/types/camper";
import styles from "./Filters.module.css";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

interface Props {
  onSearch: (filters: CamperFilters) => void;
}

const FORM_OPTIONS = [
  { value: "alcove", label: "Alcove" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "panelTruck", label: "Panel Van" },
];

const ENGINE_OPTIONS = [
  { value: "diesel", label: "Diesel" },
  { value: "petrol", label: "Petrol" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
];

const TRANSMISSION_OPTIONS = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

export default function Filters({ onSearch }: Props) {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");

  const handleSearch = () => {
    onSearch({
      location: location || undefined,
      form: form || undefined,
      engine: engine || undefined,
      transmission: transmission || undefined,
    });
  };

  const handleClear = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");
    onSearch({});
  };

  return (
    <aside className={styles.sidebar}>
      {/* Location */}
      <div className={styles.locationBlock}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrap}>
          <FaMapMarkerAlt className={styles.inputIcon} />
          <input
            type="text"
            className={styles.input}
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div>
        <h3 className={styles.filtersTitle}>Filters</h3>

        {/* Camper form */}
        <div className={styles.group}>
          <p className={styles.groupTitle}>Camper form</p>
          <div className={styles.radioList}>
            {FORM_OPTIONS.map((opt) => (
              <label key={opt.value} className={styles.radioItem}>
                <input
                  type="radio"
                  name="form"
                  value={opt.value}
                  checked={form === opt.value}
                  onChange={() => setForm(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Engine */}
        <div className={styles.group}>
          <p className={styles.groupTitle}>Engine</p>
          <div className={styles.radioList}>
            {ENGINE_OPTIONS.map((opt) => (
              <label key={opt.value} className={styles.radioItem}>
                <input
                  type="radio"
                  name="engine"
                  value={opt.value}
                  checked={engine === opt.value}
                  onChange={() => setEngine(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className={styles.group}>
          <p className={styles.groupTitle}>Transmission</p>
          <div className={styles.radioList}>
            {TRANSMISSION_OPTIONS.map((opt) => (
              <label key={opt.value} className={styles.radioItem}>
                <input
                  type="radio"
                  name="transmission"
                  value={opt.value}
                  checked={transmission === opt.value}
                  onChange={() => setTransmission(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            <FaTimes size={12} />
            Clear filters
          </button>
        </div>
      </div>
    </aside>
  );
}
