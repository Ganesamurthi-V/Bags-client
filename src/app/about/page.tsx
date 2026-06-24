import Image from "next/image";

const processSteps = [
  { step: "1", title: "Consultation", desc: "We discuss your needs and preferences." },
  { step: "2", title: "Design Planning", desc: "Choosing the right materials and colors." },
  { step: "3", title: "Design Approval", desc: "Reviewing the digital mockup." },
  { step: "4", title: "Manufacturing", desc: "Crafting the bags with precision." },
  { step: "5", title: "Quality Inspection", desc: "Ensuring every stitch is perfect." },
  { step: "6", title: "Delivery", desc: "Safe and timely Pan India delivery." },
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-playfair text-4xl md:text-[46px] leading-tight font-medium mb-8 text-center text-foreground/90">
          Crafting Wedding Bags With Passion Since 2019
        </h1>

        {/* Founder / Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="flex flex-col gap-6">
            <p className="text-lg text-muted-foreground">
              Founded by **Pregadeeswari S **, Purple Bags specializes in manufacturing
              premium customized wedding bags for weddings and celebrations across
              India.
            </p>
            <p className="text-lg text-muted-foreground">
              With more than 1000 satisfied customers and years of manufacturing
              expertise, we transform ideas into elegant wedding bags that leave
              lasting impressions.
            </p>
            <p className="text-lg text-muted-foreground">
              From bride and groom names to logos, wedding dates, and custom
              artwork, every bag is designed with care, precision, and attention
              to detail.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/purple-bag1.png"
              alt="Purple Bags manufacturing and crafting process"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Manufacturing images */}
        <div className="grid grid-cols-3 gap-4 mb-24">
          {[
            { src: "/images/manufacturing-1.jpg", alt: "Bag manufacturing process" },
            { src: "/images/manufacturing-2.jpg", alt: "Quality craftsmanship at Purple Bags" },
            { src: "/images/manufacturing-3.jpg", alt: "Finished wedding bags ready for delivery" },
          ].map(({ src, alt }) => (
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Process steps */}
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
          From Design To Delivery
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
