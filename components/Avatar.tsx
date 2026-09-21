interface AvatarProps {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: 36, md: 64, lg: 120 };

export default function Avatar({ name, photoUrl, size = "md" }: AvatarProps) {
  const px = sizeMap[size];
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        width={px}
        height={px}
        className={`avatar avatar--${size}`}
      />
    );
  }

  return (
    <div
      className={`avatar avatar--${size} avatar--initials`}
      aria-label={name}
      style={{ width: px, height: px, fontSize: px * 0.38 }}
    >
      {initials}
    </div>
  );
}
