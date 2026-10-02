import type { CSSProperties } from "react";

// Photos: put a square JPG at public/team/<slug>.jpg. Until then the initials show.
export function Person({ slug, name, role, size = "md" }: { slug: string; name: string; role: string; size?: "lg" | "md" | "sm" }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className={`person ${size}`}>
      <div className="avatar" aria-hidden>
        <span>{initials}</span>
        <i style={{ "--photo": `url(/team/${slug}.jpg)` } as CSSProperties} />
      </div>
      <b>{name}</b>
      <small>{role}</small>
    </div>
  );
}
