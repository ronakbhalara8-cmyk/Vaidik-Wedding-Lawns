import Link from "next/link";
import Magnetic from "./Magnetic";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary", // primary, secondary, outline, text
  magnetic = true,
  className = "",
  ...props
}) {
  const baseStyle =
    "relative overflow-hidden inline-flex items-center justify-center px-8 py-4 font-serif-heading text-xs tracking-[0.2em] uppercase transition-all duration-500 rounded-full select-none cursor-pointer";

  let variantStyle = "";
  if (variant === "primary") {
    // Maroon bg, gold border, ivory text, gold hover background
    variantStyle =
      "bg-maroon-dark text-gold-light border border-gold-base/30 hover:border-gold-base shadow-xl hover:shadow-maroon-light/25";
  } else if (variant === "secondary") {
    // Gold bg, dark maroon text
    variantStyle =
      "bg-grad-gold text-maroon-dark border border-gold-light/40 shadow-xl hover:shadow-gold-base/20 font-medium";
  } else if (variant === "outline") {
    // Transparent, gold border, gold text
    variantStyle =
      "bg-transparent text-gold-base border border-gold-base/50 hover:border-gold-light";
  } else if (variant === "text") {
    // Luxury text-only button with animated underline
    return (
      <Link
        href={href || "#"}
        className={`group inline-flex items-center gap-2 font-serif-heading text-xs tracking-[0.25em] uppercase text-gold-base hover:text-gold-light transition-colors duration-300 ${className}`}
        onClick={onClick}
        {...props}
      >
        <span>{children}</span>
        <span className="w-0 h-[1px] bg-gold-base group-hover:w-full transition-all duration-500 ease-out" />
      </Link>
    );
  }

  const InnerContent = () => (
    <>
      {/* Background slide animation layer */}
      <span
        className={`absolute inset-0 w-full h-full scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10
          ${variant === "primary" ? "bg-grad-gold" : ""}
          ${variant === "secondary" ? "bg-maroon-dark" : ""}
          ${variant === "outline" ? "bg-grad-gold" : ""}
          group-hover:scale-y-100`}
      />
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-500
          ${
            variant === "primary"
              ? "text-gold-light group-hover:text-maroon-dark font-medium"
              : ""
          }
          ${
            variant === "secondary"
              ? "text-maroon-dark group-hover:text-gold-light"
              : ""
          }
          ${
            variant === "outline"
              ? "text-gold-base group-hover:text-maroon-dark"
              : ""
          }`}
      >
        {children}
      </span>
    </>
  );

  const buttonContent = href ? (
    <Link
      href={href}
      className={`group ${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      <InnerContent />
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`group ${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      <InnerContent />
    </button>
  );

  if (magnetic) {
    return <Magnetic speed={0.2} range={30}>{buttonContent}</Magnetic>;
  }

  return buttonContent;
}
