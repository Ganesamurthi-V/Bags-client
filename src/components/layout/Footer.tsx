"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

// Social icons, wired to siteConfig. Any profile left blank in config is
// omitted rather than shipped as a dead "#" link.
const SOCIAL_ICONS = {
  facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  ),
  instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  ),
  whatsapp: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
} as const;

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/design") return null;

  const socials = (
    Object.keys(SOCIAL_ICONS) as (keyof typeof SOCIAL_ICONS)[]
  )
    .map((key) => ({ key, href: siteConfig.socials[key], icon: SOCIAL_ICONS[key] }))
    .filter((s) => s.href);

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8">

        {/* TOP ROW: Massive Brand Name */}
        <div className="mb-16 md:mb-24">
          <Link href="/">
            <span className="font-heading text-[18vw] md:text-[15vw] lg:text-[12rem] leading-[0.75] text-primary block text-center md:text-left w-full hover:opacity-90 transition-opacity">
              Purple Bags
            </span>
          </Link>
        </div>

        {/* BOTTOM ROW: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Column 1 - Description & Socials */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Elegance in Every Stitch. Premium customized wedding bags designed
              with your names, wedding dates, logos, and unique artwork.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-4 mt-2">
                {socials.map(({ key, href, icon }) => (
                  <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col gap-5 lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading text-2xl tracking-wide text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">Collections</Link>
              <Link href="/design" className="text-sm text-muted-foreground hover:text-primary transition-colors">Design Your Bag</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            </nav>
          </div>

          {/* Column 3 - Information */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <h4 className="font-heading text-2xl tracking-wide text-foreground">Information</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link href="/collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Collections</Link>
            </nav>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <h4 className="font-heading text-2xl tracking-wide text-foreground">Contact Info</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>8A 2nd Cross, Mariamman Nagar,</p>
              <p>Karamanikuppam, Puducherry</p>
              <p className="mt-2">Phone: +91 XXXXXXXXXX</p>
              <p>WhatsApp: +91 XXXXXXXXXX</p>
              <p>Email: info@purplebags.in</p>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Purple Bags. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
