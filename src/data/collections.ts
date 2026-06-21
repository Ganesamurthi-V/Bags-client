export interface Collection {
  id: number;
  title: string;
  material: string;
  category: "Jute" | "Cotton" | "Fabric" | "Premium" | "Non-Woven";
  img: string;
}

export const collections: Collection[] = [
  { id: 1,  title: "Traditional Jute Wedding Bag",      material: "Jute",      category: "Jute",      img: "/images/collection-jute-1.jpg" },
  { id: 2,  title: "Classic Jute Return Bag",           material: "Jute",      category: "Jute",      img: "/images/collection-jute-2.jpg" },
  { id: 3,  title: "Eco Jute Tote Bag",                 material: "Jute",      category: "Jute",      img: "/images/collection-jute-3.jpg" },
  { id: 4,  title: "Soft Cotton Wedding Bag",           material: "Cotton",    category: "Cotton",    img: "/images/collection-cotton-1.jpg" },
  { id: 5,  title: "Printed Cotton Tote",               material: "Cotton",    category: "Cotton",    img: "/images/collection-cotton-2.jpg" },
  { id: 6,  title: "Custom Cotton Gift Bag",            material: "Cotton",    category: "Cotton",    img: "/images/collection-cotton-3.jpg" },
  { id: 7,  title: "Elegant Fabric Wedding Bag",        material: "Fabric",    category: "Fabric",    img: "/images/collection-fabric-1.jpg" },
  { id: 8,  title: "Designer Fabric Pouch",             material: "Fabric",    category: "Fabric",    img: "/images/collection-fabric-2.jpg" },
  { id: 9,  title: "Gold Embroidered Premium Bag",      material: "Satin",     category: "Premium",   img: "/images/collection-premium-1.jpg" },
  { id: 10, title: "Luxury Wedding Satin Pouch",        material: "Satin",     category: "Premium",   img: "/images/collection-premium-2.jpg" },
  { id: 11, title: "Royal Premium Gift Bag",            material: "Premium",   category: "Premium",   img: "/images/collection-premium-3.jpg" },
  { id: 12, title: "Practical Non-Woven Bag",           material: "Non-Woven", category: "Non-Woven", img: "/images/collection-nonwoven-1.jpg" },
];
