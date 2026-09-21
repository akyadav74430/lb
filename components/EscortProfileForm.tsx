"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  getAllStates,
  getDistrictsForState,
  getCitiesForDistrict,
  getLocalAreas,
} from "@/lib/india-locations";

/* ─── Types ─── */
interface PhotoItem {
  id: string;
  preview: string;
  file?: File;
  isMain: boolean;
}

interface EscortFormData {
  // Section B – Basic Info (India Location)
  displayName: string;
  status: "Independent" | "Agency" | "";
  gender: "female" | "male" | "trans" | "";
  age: string;
  state: string;
  district: string;
  city: string;
  localArea: string;
  country: string;
  nationality: string;
  languages: string[];
  // Section C – Physical
  eyes: string;
  hairColor: string;
  hairLength: string;
  pubicHair: string;
  bustSize: string;
  bustType: "Natural" | "Enhanced" | "";
  weightKg: string;
  heightCm: string;
  ethnicity: string;
  orientation: string;
  smoker: "No" | "Sometimes" | "Yes" | "";
  tattoo: "Yes" | "No" | "";
  piercing: "Yes" | "No" | "";
  // Section D – Services
  travel: string[];
  availableFor: string[];
  meetingWith: string[];
  services: string[];
  // Section E – Badges
  badges: string[];
  // Section F – About & Contact
  about: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  // Section G - Rates
  rates: { duration: string, incall: string, outcall: string }[];
}

/* ─── Option Lists ─── */
const EYES_OPTIONS = ["Brown", "Deep Brown", "Black", "Hazel", "Amber", "Green", "Blue", "Gray"];
const HAIR_COLOR_OPTIONS = ["Black", "Dark Brown", "Chestnut", "Brunette", "Blonde", "Red", "Auburn", "Other"];
const HAIR_LENGTH_OPTIONS = ["Short", "Medium", "Long", "Very Long", "Shaved"];
const PUBIC_OPTIONS = ["Shaved", "Trimmed", "Landing Strip", "Natural", "Brazilian"];
const BUST_SIZE_OPTIONS = ["A", "B", "C", "D", "DD", "E", "F", "G+"];
const ETHNICITY_OPTIONS = ["Indian", "North Indian", "South Indian", "East Indian", "Asian", "Mixed", "Exotic", "Other"];
const ORIENTATION_OPTIONS = ["Straight", "Bisexual", "Lesbian", "Bisexual Curious", "Other"];
const TRAVEL_OPTIONS = ["Local Area Only", "City Wide", "District", "State Wide", "All India", "International"];
const AVAILABLE_FOR_OPTIONS = ["Incall", "Outcall", "Both"];
const MEETING_WITH_OPTIONS = ["Man", "Woman", "Couple", "Group", "Trans"];
const ALL_LANGUAGES = [
  "English", "Hindi", "Bengali", "Marathi", "Telugu", "Tamil",
  "Gujarati", "Kannada", "Malayalam", "Odia", "Punjabi", "French",
  "Spanish", "Russian", "Arabic"
];
const ALL_NATIONALITIES = ["Indian", "Russian", "Ukrainian", "Nepalese", "Thai", "Arabic", "British", "American", "French", "Other"];

const SERVICES_LIST = [
  "Girlfriend Experience (GFE)", "French Kissing", "Deep French Kissing",
  "Sensual Erotic Massage", "Body-to-Body Massage", "Nuru Massage", "Tantric Massage",
  "Oral with Condom", "Oral without Condom (OWO)", "Cum on Body (COB)",
  "Classic (Vaginal)", "Doggy Style", "Multiple Positions",
  "Striptease & Private Dance", "Couples & Duo Sessions", "Fetish (discuss)",
  "BDSM Light", "Role Play", "Dinner Date", "Travel Companion",
  "Romantic Shower Together", "Jacuzzi / Hot Tub", "City Sightseeing",
];

const BADGE_OPTIONS = [
  { key: "NEW", label: "NEW", color: "#E91E63" },
  { key: "INDEPENDENT", label: "INDEPENDENT", color: "#6b21a8" },
  { key: "VIDEO", label: "VIDEO", color: "#2563eb" },
  { key: "VERIFIED", label: "VERIFIED", color: "#1b9e4b" },
  { key: "VIP", label: "VIP", color: "#c41e3a" },
  { key: "PREMIUM TOP", label: "PREMIUM TOP", color: "#d97706" },
  { key: "WITH REVIEWS", label: "WITH REVIEWS", color: "#0891b2" },
];

const STEPS = ["Photos", "Basic Info", "Physical", "Services", "Publish"];

const defaultForm: EscortFormData = {
  displayName: "",
  status: "Independent",
  gender: "female",
  age: "",
  state: "West Bengal",
  district: "Kolkata",
  city: "Kolkata",
  localArea: "Park Street",
  country: "India",
  nationality: "Indian",
  languages: ["English", "Hindi"],
  eyes: "Deep Brown",
  hairColor: "Black",
  hairLength: "Long",
  pubicHair: "Shaved",
  bustSize: "C",
  bustType: "Natural",
  weightKg: "",
  heightCm: "",
  ethnicity: "Indian",
  orientation: "Straight",
  smoker: "No",
  tattoo: "No",
  piercing: "No",
  travel: ["City Wide", "State Wide"],
  availableFor: ["Incall", "Outcall"],
  meetingWith: ["Man"],
  services: ["Girlfriend Experience (GFE)", "French Kissing", "Sensual Erotic Massage"],
  badges: ["VERIFIED", "INDEPENDENT"],
  about: "",
  phone: "",
  whatsapp: "",
  telegram: "",
  rates: [],
};

interface EscortProfileFormProps {
  initialData?: Partial<EscortFormData>;
  mode?: "add" | "edit";
}

export default function EscortProfileForm({ initialData, mode = "add" }: EscortProfileFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [form, setForm] = useState<EscortFormData>({ ...defaultForm, ...(initialData || {}) });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [langSearch, setLangSearch] = useState("");
  const [svcSearch, setSvcSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dependent location options
  const indianStates = useMemo(() => getAllStates(), []);
  const availableDistricts = useMemo(() => (form.state ? getDistrictsForState(form.state) : []), [form.state]);
  const availableCities = useMemo(() => {
    if (form.state && form.district) {
      return getCitiesForDistrict(form.state, form.district);
    }
    return [];
  }, [form.state, form.district]);
  const availableLocalAreas = useMemo(() => {
    if (form.state && form.district && form.city) {
      return getLocalAreas(form.state, form.district, form.city);
    }
    return [];
  }, [form.state, form.district, form.city]);

  /* ─── Photo Upload ─── */
  const compressAndPreview = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    const remaining = 6 - photos.length;
    const toProcess = fileArr.slice(0, remaining);

    const newItems: PhotoItem[] = [];
    for (const file of toProcess) {
      if (!file.type.startsWith("image/")) continue;
      const preview = URL.createObjectURL(file);
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        preview,
        file,
        isMain: photos.length === 0 && newItems.length === 0,
      });
    }

    setPhotos((prev) => {
      const combined = [...prev, ...newItems];
      if (combined.length > 0 && !combined.some((p) => p.isMain)) {
        combined[0].isMain = true;
      }
      return combined;
    });
  }, [photos.length]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) compressAndPreview(e.target.files);
  };

  const handleDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) compressAndPreview(e.dataTransfer.files);
  };

  const setMainPhoto = (id: string) => {
    setPhotos((prev) => prev.map((p) => ({ ...p, isMain: p.id === id })));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (filtered.length > 0 && !filtered.some((p) => p.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  /* Drag & Drop Reorder */
  const onDragStart = (index: number) => setDragIndex(index);
  const onDragEnterSlot = (index: number) => setDropIndex(index);
  const onDragEndReorder = () => {
    if (dragIndex === null || dropIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDropIndex(null);
      return;
    }
    setPhotos((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(dragIndex, 1);
      copy.splice(dropIndex, 0, moved);
      return copy;
    });
    setDragIndex(null);
    setDropIndex(null);
  };

  const toggleArr = (key: keyof EscortFormData, val: string) => {
    setForm((prev) => {
      const arr = (prev[key] as string[]) || [];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  /* ─── Validation ─── */
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (photos.length < 5) errs.photos = "Please upload at least 5 photos.";
    if (!form.displayName.trim()) errs.displayName = "Display name is required.";
    if (!form.status) errs.status = "Status is required.";
    if (!form.gender) errs.gender = "Gender is required.";
    const age = parseInt(form.age);
    if (!form.age || isNaN(age) || age < 18 || age > 99) errs.age = "Age must be 18–99.";
    if (!form.state) errs.state = "State is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (form.languages.length === 0) errs.languages = "Select at least one language.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ─── Submit ─── */
  const handlePublish = async (draft = false) => {
    if (!draft && !validate()) {
      setStep(0);
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    alert(draft ? "Draft saved!" : "Profile published successfully!");
    router.push("/");
  };

  /* ─── Height / Weight display ─── */
  const heightDisplay = form.heightCm
    ? (() => {
        const cm = parseFloat(form.heightCm);
        const inches = cm / 2.54;
        const ft = Math.floor(inches / 12);
        const remainIn = Math.round(inches % 12);
        return `${cm} cm / ${ft}'${remainIn}"`;
      })()
    : "";

  const weightDisplay = form.weightKg
    ? (() => {
        const kg = parseFloat(form.weightKg);
        const lbs = Math.round(kg * 2.20462);
        return `${kg} kg / ${lbs} lbs`;
      })()
    : "";

  /* ─── Render Steps ─── */
  const stepContent = [
    /* ═══ STEP 0: PHOTOS ═══ */
    <div key="photos" className="epf-section">
      <div className="epf-section-header">
        <h2 className="epf-section-title">📸 Photo Gallery (5–6 Photos)</h2>
        <p className="epf-section-desc">
          Upload 5–6 clear, authentic photos. Star the main photo. Drag &amp; drop to reorder.
        </p>
      </div>

      {errors.photos && <div className="epf-alert epf-alert--error">{errors.photos}</div>}

      {/* Upload Drop Zone */}
      {photos.length < 6 && (
        <div
          className={`epf-dropzone ${dragOver ? "epf-dropzone--over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDropZone}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          id="photo-dropzone"
          aria-label="Upload photos"
        >
          <div className="epf-dropzone-icon">📤</div>
          <p className="epf-dropzone-text">Drag &amp; drop photos here or <strong>click to browse</strong></p>
          <p className="epf-dropzone-hint">JPG · PNG · WEBP · Max 5MB per photo · {6 - photos.length} more allowed</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileInput}
            hidden
            aria-label="File input for photos"
          />
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="epf-photo-grid">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`epf-photo-slot ${photo.isMain ? "epf-photo-slot--main" : ""} ${dropIndex === idx ? "epf-photo-slot--drop-target" : ""}`}
              draggable
              onDragStart={() => onDragStart(idx)}
              onDragEnter={() => onDragEnterSlot(idx)}
              onDragEnd={onDragEndReorder}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.preview} alt={`Photo ${idx + 1}`} className="epf-photo-img" />
              {photo.isMain && <div className="epf-photo-main-badge">★ MAIN</div>}
              <div className="epf-photo-controls">
                {!photo.isMain && (
                  <button
                    type="button"
                    className="epf-photo-btn epf-photo-btn--star"
                    onClick={() => setMainPhoto(photo.id)}
                    title="Set as main photo"
                  >★</button>
                )}
                <button
                  type="button"
                  className="epf-photo-btn epf-photo-btn--delete"
                  onClick={() => removePhoto(photo.id)}
                  title="Remove photo"
                >✕</button>
              </div>
              <div className="epf-photo-drag-handle" title="Drag to reorder">⠿</div>
            </div>
          ))}
        </div>
      )}

      <div className="epf-photo-counter">
        <span className={photos.length >= 5 ? "epf-counter--ok" : "epf-counter--warn"}>
          {photos.length}/6 photos uploaded {photos.length < 5 ? `(${5 - photos.length} more required)` : "✓ Minimum met"}
        </span>
      </div>
    </div>,

    /* ═══ STEP 1: BASIC INFO ═══ */
    <div key="basic" className="epf-section">
      <div className="epf-section-header">
        <h2 className="epf-section-title">👤 Basic Information &amp; Location</h2>
        <p className="epf-section-desc">Your public profile identity and location in India.</p>
      </div>

      <div className="epf-form-grid">
        {/* Display Name */}
        <div className="epf-field epf-field--full">
          <label className="epf-label" htmlFor="displayName">Display Name <span className="epf-required">*</span></label>
          <input
            id="displayName"
            type="text"
            className={`epf-input ${errors.displayName ? "epf-input--error" : ""}`}
            placeholder="e.g. Saloni / Ipshita"
            value={form.displayName}
            onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))}
            maxLength={60}
          />
          {errors.displayName && <span className="epf-field-error">{errors.displayName}</span>}
        </div>

        {/* Status */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="status">Status <span className="epf-required">*</span></label>
          <select
            id="status"
            className={`epf-input ${errors.status ? "epf-input--error" : ""}`}
            value={form.status}
            onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as EscortFormData["status"] }))}
          >
            <option value="">Select…</option>
            <option value="Independent">Independent</option>
            <option value="Agency">Agency</option>
          </select>
          {errors.status && <span className="epf-field-error">{errors.status}</span>}
        </div>

        {/* Gender */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="gender">Gender <span className="epf-required">*</span></label>
          <select
            id="gender"
            className={`epf-input ${errors.gender ? "epf-input--error" : ""}`}
            value={form.gender}
            onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value as EscortFormData["gender"] }))}
          >
            <option value="">Select…</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="trans">Trans</option>
          </select>
          {errors.gender && <span className="epf-field-error">{errors.gender}</span>}
        </div>

        {/* Age */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="age">Age <span className="epf-required">*</span></label>
          <input
            id="age"
            type="number"
            className={`epf-input ${errors.age ? "epf-input--error" : ""}`}
            placeholder="e.g. 23"
            value={form.age}
            min={18} max={99}
            onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
          />
          {errors.age && <span className="epf-field-error">{errors.age}</span>}
        </div>

        {/* State (India) */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="state">Indian State <span className="epf-required">*</span></label>
          <select
            id="state"
            className={`epf-input ${errors.state ? "epf-input--error" : ""}`}
            value={form.state}
            onChange={(e) => {
              const newState = e.target.value;
              const dists = getDistrictsForState(newState);
              const firstDist = dists[0] || "";
              const cities = firstDist ? getCitiesForDistrict(newState, firstDist) : [];
              const firstCity = cities[0] || "";
              const areas = firstCity ? getLocalAreas(newState, firstDist, firstCity) : [];
              setForm((p) => ({
                ...p,
                state: newState,
                district: firstDist,
                city: firstCity,
                localArea: areas[0] || "",
              }));
            }}
          >
            <option value="">Select State…</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <span className="epf-field-error">{errors.state}</span>}
        </div>

        {/* District */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="district">District</label>
          <select
            id="district"
            className="epf-input"
            value={form.district}
            onChange={(e) => {
              const newDist = e.target.value;
              const cities = getCitiesForDistrict(form.state, newDist);
              const firstCity = cities[0] || "";
              const areas = firstCity ? getLocalAreas(form.state, newDist, firstCity) : [];
              setForm((p) => ({
                ...p,
                district: newDist,
                city: firstCity,
                localArea: areas[0] || "",
              }));
            }}
          >
            <option value="">Select District…</option>
            {availableDistricts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="city">City <span className="epf-required">*</span></label>
          {availableCities.length > 0 ? (
            <select
              id="city"
              className={`epf-input ${errors.city ? "epf-input--error" : ""}`}
              value={form.city}
              onChange={(e) => {
                const newCity = e.target.value;
                const areas = getLocalAreas(form.state, form.district, newCity);
                setForm((p) => ({ ...p, city: newCity, localArea: areas[0] || "" }));
              }}
            >
              <option value="">Select City…</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input
              id="city"
              type="text"
              className={`epf-input ${errors.city ? "epf-input--error" : ""}`}
              placeholder="e.g. Cuttack City / Kolkata"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            />
          )}
          {errors.city && <span className="epf-field-error">{errors.city}</span>}
        </div>

        {/* Local Area */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="localArea">Local Area / Landmark</label>
          {availableLocalAreas.length > 0 ? (
            <select
              id="localArea"
              className="epf-input"
              value={form.localArea}
              onChange={(e) => setForm((p) => ({ ...p, localArea: e.target.value }))}
            >
              <option value="">Select Local Area…</option>
              {availableLocalAreas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          ) : (
            <input
              id="localArea"
              type="text"
              className="epf-input"
              placeholder="e.g. Park Street / Badambadi"
              value={form.localArea}
              onChange={(e) => setForm((p) => ({ ...p, localArea: e.target.value }))}
            />
          )}
        </div>

        {/* Nationality */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="nationality">Nationality</label>
          <select
            id="nationality"
            className="epf-input"
            value={form.nationality}
            onChange={(e) => setForm((p) => ({ ...p, nationality: e.target.value }))}
          >
            {ALL_NATIONALITIES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        {/* Phone */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            className="epf-input"
            placeholder="+91 98301 23456"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
        </div>

        {/* WhatsApp */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="whatsapp">WhatsApp Number</label>
          <input
            id="whatsapp"
            type="tel"
            className="epf-input"
            placeholder="+91 98301 23456"
            value={form.whatsapp}
            onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))}
          />
        </div>

        {/* Telegram */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="telegram">Telegram Username</label>
          <input
            id="telegram"
            type="text"
            className="epf-input"
            placeholder="@username"
            value={form.telegram}
            onChange={(e) => setForm((p) => ({ ...p, telegram: e.target.value }))}
          />
        </div>

        {/* Languages */}
        <div className="epf-field epf-field--full">
          <label className="epf-label">Languages Spoken <span className="epf-required">*</span></label>
          <input
            type="text"
            className="epf-input epf-input--sm"
            placeholder="Search language…"
            value={langSearch}
            onChange={(e) => setLangSearch(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <div className="epf-checkbox-grid">
            {ALL_LANGUAGES.filter((l) => l.toLowerCase().includes(langSearch.toLowerCase())).map((lang) => (
              <label key={lang} className={`epf-check-chip ${form.languages.includes(lang) ? "epf-check-chip--active" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.languages.includes(lang)}
                  onChange={() => toggleArr("languages", lang)}
                  hidden
                />
                {lang}
              </label>
            ))}
          </div>
          {errors.languages && <span className="epf-field-error">{errors.languages}</span>}
        </div>

        {/* About */}
        <div className="epf-field epf-field--full">
          <label className="epf-label" htmlFor="about">About Me</label>
          <textarea
            id="about"
            className="epf-input epf-textarea"
            placeholder="Introduce yourself, your vibe, meeting preferences, and what makes your company special…"
            rows={5}
            value={form.about}
            onChange={(e) => setForm((p) => ({ ...p, about: e.target.value }))}
            maxLength={1000}
          />
          <span className="epf-char-count">{form.about.length}/1000</span>
        </div>
      </div>
    </div>,

    /* ═══ STEP 2: PHYSICAL ═══ */
    <div key="physical" className="epf-section">
      <div className="epf-section-header">
        <h2 className="epf-section-title">📏 Physical Attributes</h2>
        <p className="epf-section-desc">Accurate attributes help clients find exactly what they are looking for.</p>
      </div>

      <div className="epf-form-grid">
        {/* Eyes */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="eyes">Eyes</label>
          <select id="eyes" className="epf-input" value={form.eyes} onChange={(e) => setForm((p) => ({ ...p, eyes: e.target.value }))}>
            <option value="">Select…</option>
            {EYES_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Hair Color */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="hairColor">Hair Color</label>
          <select id="hairColor" className="epf-input" value={form.hairColor} onChange={(e) => setForm((p) => ({ ...p, hairColor: e.target.value }))}>
            <option value="">Select…</option>
            {HAIR_COLOR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Hair Length */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="hairLength">Hair Length</label>
          <select id="hairLength" className="epf-input" value={form.hairLength} onChange={(e) => setForm((p) => ({ ...p, hairLength: e.target.value }))}>
            <option value="">Select…</option>
            {HAIR_LENGTH_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Pubic Hair */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="pubicHair">Pubic Hair</label>
          <select id="pubicHair" className="epf-input" value={form.pubicHair} onChange={(e) => setForm((p) => ({ ...p, pubicHair: e.target.value }))}>
            <option value="">Select…</option>
            {PUBIC_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Bust Size */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="bustSize">Bust Size</label>
          <select id="bustSize" className="epf-input" value={form.bustSize} onChange={(e) => setForm((p) => ({ ...p, bustSize: e.target.value }))}>
            <option value="">Select…</option>
            {BUST_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Bust Type */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="bustType">Bust Type</label>
          <select id="bustType" className="epf-input" value={form.bustType} onChange={(e) => setForm((p) => ({ ...p, bustType: e.target.value as EscortFormData["bustType"] }))}>
            <option value="">Select…</option>
            <option value="Natural">Natural</option>
            <option value="Enhanced">Enhanced</option>
          </select>
        </div>

        {/* Height */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="heightCm">Height (cm)</label>
          <input
            id="heightCm"
            type="number"
            className="epf-input"
            placeholder="e.g. 168"
            min={140} max={210}
            value={form.heightCm}
            onChange={(e) => setForm((p) => ({ ...p, heightCm: e.target.value }))}
          />
          {heightDisplay && <span className="epf-unit-display">{heightDisplay}</span>}
        </div>

        {/* Weight */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="weightKg">Weight (kg)</label>
          <input
            id="weightKg"
            type="number"
            className="epf-input"
            placeholder="e.g. 52"
            min={40} max={150}
            value={form.weightKg}
            onChange={(e) => setForm((p) => ({ ...p, weightKg: e.target.value }))}
          />
          {weightDisplay && <span className="epf-unit-display">{weightDisplay}</span>}
        </div>

        {/* Ethnicity */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="ethnicity">Ethnicity</label>
          <select id="ethnicity" className="epf-input" value={form.ethnicity} onChange={(e) => setForm((p) => ({ ...p, ethnicity: e.target.value }))}>
            <option value="">Select…</option>
            {ETHNICITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Orientation */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="orientation">Orientation</label>
          <select id="orientation" className="epf-input" value={form.orientation} onChange={(e) => setForm((p) => ({ ...p, orientation: e.target.value }))}>
            <option value="">Select…</option>
            {ORIENTATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Smoker */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="smoker">Smoker</label>
          <select id="smoker" className="epf-input" value={form.smoker} onChange={(e) => setForm((p) => ({ ...p, smoker: e.target.value as EscortFormData["smoker"] }))}>
            <option value="">Select…</option>
            <option value="No">No</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Tattoo */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="tattoo">Tattoos</label>
          <select id="tattoo" className="epf-input" value={form.tattoo} onChange={(e) => setForm((p) => ({ ...p, tattoo: e.target.value as EscortFormData["tattoo"] }))}>
            <option value="">Select…</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Piercing */}
        <div className="epf-field">
          <label className="epf-label" htmlFor="piercing">Piercings</label>
          <select id="piercing" className="epf-input" value={form.piercing} onChange={(e) => setForm((p) => ({ ...p, piercing: e.target.value as EscortFormData["piercing"] }))}>
            <option value="">Select…</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>
    </div>,

    /* ═══ STEP 3: SERVICES & PREFERENCES ═══ */
    <div key="services" className="epf-section">
      <div className="epf-section-header">
        <h2 className="epf-section-title">⚙️ Services &amp; Preferences</h2>
        <p className="epf-section-desc">Select who you meet, travel flexibility, and services offered.</p>
      </div>

      {/* Pricing & Rates */}
      <div className="epf-subsection">
        <h3 className="epf-subsection-title">💰 Rates &amp; Pricing (INR)</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 12px" }}>Enter numeric rates only (e.g. 12500).</p>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 8, paddingBottom: 6, borderBottom: "1px solid var(--border)", fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>
            <span>Duration</span>
            <span>Standard Rate</span>
            <span>Premium Rate</span>
          </div>
          {["1 Hour", "2 Hours", "3 Hours", "Full Night", "Full Day"].map((duration, i) => {
            const currentRate = form.rates?.find(r => r.duration === duration) || { duration, incall: "", outcall: "" };
            return (
              <div key={duration} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{duration}</span>
                <input
                  type="number"
                  className="epf-input"
                  placeholder="Standard (₹)"
                  value={currentRate.incall || ""}
                  onChange={(e) => {
                    const newRates = [...(form.rates || [])];
                    const idx = newRates.findIndex(r => r.duration === duration);
                    if (idx >= 0) newRates[idx].incall = e.target.value;
                    else newRates.push({ duration, incall: e.target.value, outcall: "" });
                    setForm(p => ({ ...p, rates: newRates }));
                  }}
                />
                <input
                  type="number"
                  className="epf-input"
                  placeholder="Premium (₹)"
                  value={currentRate.outcall || ""}
                  onChange={(e) => {
                    const newRates = [...(form.rates || [])];
                    const idx = newRates.findIndex(r => r.duration === duration);
                    if (idx >= 0) newRates[idx].outcall = e.target.value;
                    else newRates.push({ duration, incall: "", outcall: e.target.value });
                    setForm(p => ({ ...p, rates: newRates }));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Available For */}
      <div className="epf-subsection">
        <h3 className="epf-subsection-title">Available For</h3>
        <div className="epf-checkbox-grid">
          {AVAILABLE_FOR_OPTIONS.map((opt) => (
            <label key={opt} className={`epf-check-chip ${form.availableFor.includes(opt) ? "epf-check-chip--active" : ""}`}>
              <input type="checkbox" checked={form.availableFor.includes(opt)} onChange={() => toggleArr("availableFor", opt)} hidden />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Meeting With */}
      <div className="epf-subsection">
        <h3 className="epf-subsection-title">Meeting With</h3>
        <div className="epf-checkbox-grid">
          {MEETING_WITH_OPTIONS.map((opt) => (
            <label key={opt} className={`epf-check-chip ${form.meetingWith.includes(opt) ? "epf-check-chip--active" : ""}`}>
              <input type="checkbox" checked={form.meetingWith.includes(opt)} onChange={() => toggleArr("meetingWith", opt)} hidden />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Travel Options */}
      <div className="epf-subsection">
        <h3 className="epf-subsection-title">Travel Flexibility</h3>
        <div className="epf-checkbox-grid">
          {TRAVEL_OPTIONS.map((opt) => (
            <label key={opt} className={`epf-check-chip ${form.travel.includes(opt) ? "epf-check-chip--active" : ""}`}>
              <input type="checkbox" checked={form.travel.includes(opt)} onChange={() => toggleArr("travel", opt)} hidden />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="epf-subsection">
        <h3 className="epf-subsection-title">Services Offered</h3>
        <input
          type="text"
          className="epf-input"
          placeholder="Search services…"
          value={svcSearch}
          onChange={(e) => setSvcSearch(e.target.value)}
          style={{ marginBottom: 10 }}
          id="services-search"
        />
        <div className="epf-checkbox-grid epf-checkbox-grid--services">
          {SERVICES_LIST.filter((s) => s.toLowerCase().includes(svcSearch.toLowerCase())).map((svc) => (
            <label key={svc} className={`epf-check-chip ${form.services.includes(svc) ? "epf-check-chip--active" : ""}`}>
              <input type="checkbox" checked={form.services.includes(svc)} onChange={() => toggleArr("services", svc)} hidden />
              {svc}
            </label>
          ))}
        </div>
      </div>
    </div>,

    /* ═══ STEP 4: PUBLISH ═══ */
    <div key="publish" className="epf-section">
      <div className="epf-section-header">
        <h2 className="epf-section-title">🏅 Badges &amp; Publish</h2>
        <p className="epf-section-desc">Select your profile badges. Review and publish.</p>
      </div>

      {/* Badges */}
      <div className="epf-subsection">
        <h3 className="epf-subsection-title">Profile Badges</h3>
        <div className="epf-badge-toggles">
          {BADGE_OPTIONS.map((badge) => (
            <label
              key={badge.key}
              className={`epf-badge-toggle ${form.badges.includes(badge.key) ? "epf-badge-toggle--active" : ""}`}
              style={form.badges.includes(badge.key) ? { borderColor: badge.color, background: `${badge.color}18` } : {}}
            >
              <input
                type="checkbox"
                checked={form.badges.includes(badge.key)}
                onChange={() => toggleArr("badges", badge.key)}
                hidden
                id={`badge-${badge.key.replace(/\s/g, "-")}`}
              />
              <span className="epf-badge-toggle-dot" style={{ background: badge.color }} />
              {badge.label}
            </label>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="epf-publish-summary">
        <h3 className="epf-subsection-title">Profile Summary</h3>
        <div className="epf-summary-grid">
          <div className="epf-summary-item"><span className="epf-summary-label">Name</span><span className="epf-summary-value">{form.displayName || "—"}</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Status</span><span className="epf-summary-value">{form.status || "—"}</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Age</span><span className="epf-summary-value">{form.age || "—"}</span></div>
          <div className="epf-summary-item">
            <span className="epf-summary-label">Location</span>
            <span className="epf-summary-value">
              {form.city ? `${form.localArea ? form.localArea + ", " : ""}${form.city}, ${form.state || "India"}` : "—"}
            </span>
          </div>
          <div className="epf-summary-item"><span className="epf-summary-label">Height</span><span className="epf-summary-value">{heightDisplay || "—"}</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Weight</span><span className="epf-summary-value">{weightDisplay || "—"}</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Photos</span><span className={`epf-summary-value ${photos.length >= 5 ? "epf-summary-ok" : "epf-summary-warn"}`}>{photos.length} uploaded {photos.length >= 5 ? "✓" : `(need ${5 - photos.length} more)`}</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Languages</span><span className="epf-summary-value">{form.languages.join(", ") || "—"}</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Services</span><span className="epf-summary-value">{form.services.length} selected</span></div>
          <div className="epf-summary-item"><span className="epf-summary-label">Badges</span><span className="epf-summary-value">{form.badges.join(", ") || "None"}</span></div>
        </div>
      </div>

      {/* Notice */}
      <div className="epf-notice">
        🔒 By publishing, you confirm all information is accurate and you are 18+ years old. Profiles are verified within 24h.
      </div>
    </div>,
  ];

  return (
    <div className="epf-wrapper">
      {/* Page Title */}
      <div className="epf-page-header">
        <h1 className="epf-page-title">
          {mode === "edit" ? "✏️ Edit Profile" : "➕ Add New Profile"}
        </h1>
        <p className="epf-page-subtitle">
          {mode === "edit"
            ? "Update your companion profile details below."
            : "Create your professional companion profile on lovebite.com."}
        </p>
      </div>

      {/* Stepper */}
      <div className="epf-stepper" role="navigation" aria-label="Form progress">
        {STEPS.map((label, idx) => (
          <button
            key={label}
            type="button"
            id={`step-${idx}`}
            className={`epf-step ${idx === step ? "epf-step--active" : ""} ${idx < step ? "epf-step--done" : ""}`}
            onClick={() => setStep(idx)}
          >
            <span className="epf-step-num">{idx < step ? "✓" : idx + 1}</span>
            <span className="epf-step-label">{label}</span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="epf-progress-bar">
        <div className="epf-progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      {/* Step Content */}
      <div className="epf-content-card">
        {stepContent[step]}
      </div>

      {/* Navigation Actions */}
      <div className="epf-actions">
        <div className="epf-actions-left">
          <button
            type="button"
            id="btn-cancel"
            className="epf-btn epf-btn--ghost"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="button"
            id="btn-draft"
            className="epf-btn epf-btn--outline"
            onClick={() => handlePublish(true)}
            disabled={saving}
          >
            {saving ? "Saving…" : "💾 Save Draft"}
          </button>
        </div>
        <div className="epf-actions-right">
          {step > 0 && (
            <button
              type="button"
              id="btn-prev-step"
              className="epf-btn epf-btn--outline"
              onClick={() => setStep((s) => s - 1)}
            >
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              id="btn-next-step"
              className="epf-btn epf-btn--primary"
              onClick={() => setStep((s) => s + 1)}
            >
              Next: {STEPS[step + 1]} →
            </button>
          ) : (
            <button
              type="button"
              id="btn-publish"
              className="epf-btn epf-btn--publish"
              onClick={() => handlePublish(false)}
              disabled={saving}
            >
              {saving ? "Publishing…" : "🚀 Publish Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
