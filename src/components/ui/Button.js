import Link from "next/link";
import Magnetic from "./Magnetic";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  magnetic = true,
  className = "",
  ...props
}) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-3.5 uppercase tracking-[0.22em] text-xs font-medium transition-all duration-500 cursor-pointer";

  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = `
      bg-[#4D1721]
      text-[#F7E6B3]
      border
      border-[#C89B3C]
      hover:-translate-y-1
      hover:shadow-[0_18px_40px_rgba(164,111,35,.35)]
      `;
      break;

    case "secondary":
      variantStyle = `
      bg-gradient-to-r
      from-[#D5B05C]
      via-[#F2DE9A]
      to-[#C89B3C]
      text-[#4D1721]
      border
      border-[#D5B05C]
      hover:-translate-y-1
      hover:shadow-[0_18px_45px_rgba(210,165,70,.35)]
      `;
      break;

    case "outline":
      variantStyle = `
    bg-transparent
    text-gold-base
    border-2
    border-gold-base
    hover:bg-gold-base
    hover:text-maroon-dark
    hover:border-gold-light
    hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]
    hover:-translate-y-1
    transition-all
    duration-300
  `;
      break;

    default:
      variantStyle = "";
  }

  const Content = (
    <>
      {/* Shine */}
      <span className="absolute -left-32 top-0 h-full w-20 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[130%]" />

      {/* Glow Border */}
      <span className="absolute inset-[1px] rounded-full border border-white/10" />

      {/* Text */}
      <span className="relative z-20 flex items-center gap-3">
        {children}
      </span>
    </>
  );

  const button = href ? (
    <Link
      href={href}
      className={`${base} ${variantStyle} ${className}`}
      {...props}
    >
      {Content}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${base} ${variantStyle} ${className}`}
      {...props}
    >
      {Content}
    </button>
  );

  return magnetic ? (
    <Magnetic speed={0.2} range={30}>
      {button}
    </Magnetic>
  ) : (
    button
  );
}