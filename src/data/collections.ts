export type Category = "Bottle Bags" | "Fabric Tote" | "Jute Tote Bag" | "Wedding Bag" | "Potli Bags" | "Sling & Shoulder Bag";

export interface Collection {
  id: number;
  title: string;
  material: string;
  category: Category;
  img: string;
}

export const collections: Collection[] = [
  { id: 1, title: "Noir Life Bottle Bag", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/1.png" },
  { id: 2, title: "Explorer's Jute Bottle Bag", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/2.png" },
  { id: 3, title: "Aqua Leaf Drawstring", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/3.png" },
  { id: 4, title: "Verdant Tree Bottle Bag", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/4.png" },
  { id: 5, title: "Golden Thread Classic", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/5.png" },
  { id: 6, title: "Crimson Vine Bottle Bag", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/6.png" },
  { id: 7, title: "Sapphire Dream", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/7.png" },
  { id: 8, title: "Rustic Charm Holder", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/8.png" },
  { id: 9, title: "Elegant Ivory Wrap", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/9.png" },
  { id: 10, title: "Earthy Essence Jute", material: "Premium", category: "Bottle Bags", img: "/images/enhanced_bags/bottle bags/10.png" },
  
  { id: 11, title: "Classic Ivory Tote", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/1.png" },
  { id: 12, title: "Midnight Canvas Shopper", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/2.png" },
  { id: 13, title: "Blush Petal Carryall", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/3.png" },
  { id: 14, title: "The Urban Minimalist", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/4.png" },
  { id: 15, title: "Eco-Chic Daily Tote", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/5.png" },
  { id: 16, title: "Serenity Blue Weekend Bag", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/6.png" },
  { id: 17, title: "Sunset Weave Classic", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/7.png" },
  { id: 18, title: "Olive Garden Tote", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/8.png" },
  { id: 19, title: "Terracotta Dream", material: "Fabric", category: "Fabric Tote", img: "/images/enhanced_bags/fabric tote/9.png" },
  
  { id: 20, title: "Natural Bloom Jute", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/1.png" },
  { id: 21, title: "Golden Harvest Tote", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/2.png" },
  { id: 22, title: "Rustic Weave Carryall", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/3.png" },
  { id: 23, title: "Earthy Elegance Bag", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/4.png" },
  { id: 24, title: "The Heritage Jute", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/5.png" },
  { id: 25, title: "Boho Chic Shopper", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/6.png" },
  { id: 26, title: "Coastal Breeze Tote", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/7.png" },
  { id: 27, title: "Sandstone Classic", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/8.png" },
  { id: 28, title: "Vintage Appeal Jute", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/9.png" },
  { id: 29, title: "Eco-Warrior Everyday", material: "Jute", category: "Jute Tote Bag", img: "/images/enhanced_bags/jute tote bag/10.png" },
  
  { id: 30, title: "Petite Natural Charm", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/1.png" },
  { id: 31, title: "Little Wonder Jute", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/2.png" },
  { id: 32, title: "Miniature Rustic Tote", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/3.png" },
  { id: 33, title: "Tiny Treasure Bag", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/4.png" },
  { id: 34, title: "Compact Earthy Carrier", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/5.png" },
  { id: 35, title: "The Sweetheart Mini", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/6.png" },
  { id: 36, title: "Pocket Sunshine Jute", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/7.png" },
  { id: 37, title: "Mini Boho Delight", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/8.png" },
  { id: 38, title: "Little Blossom Bag", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/9.png" },
  { id: 39, title: "Snug Everyday Mini", material: "Jute", category: "Wedding Bag", img: "/images/enhanced_bags/Mini Jute Bag/10.png" },
  
  { id: 40, title: "Royal Velvet Potli", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/1.png" },
  { id: 41, title: "Golden Shimmer Pouch", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/2.png" },
  { id: 42, title: "Crimson Rose Potli", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/3.png" },
  { id: 43, title: "Emerald Evening Bag", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/4.png" },
  { id: 44, title: "Pearl Drop Drawstring", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/5.png" },
  { id: 45, title: "Sapphire Elegance Potli", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/6.png" },
  { id: 46, title: "The Bridal Classic", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/7.png" },
  { id: 47, title: "Ivory Pearl Charm", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/8.png" },
  { id: 48, title: "Festive Aura Potli", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/9.png" },
  { id: 49, title: "Midnight Sparkle Pouch", material: "Premium", category: "Potli Bags", img: "/images/enhanced_bags/potli bags/10.png" },
  
  { id: 50, title: "Urban Explorer Sling", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/1.png" },
  { id: 51, title: "The Daily Companion", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/2.png" },
  { id: 52, title: "Bohemian Fringe Shoulder Bag", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/3.png" },
  { id: 53, title: "Classic Leather-Trim Sling", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/4.png" },
  { id: 54, title: "Sunset Stroll Carrier", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/5.png" },
  { id: 55, title: "City Chic Crossbody", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/6.png" },
  { id: 56, title: "The Weekend Wanderer", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/7.png" },
  { id: 57, title: "Minimalist Curve Sling", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/8.png" },
  { id: 58, title: "Vintage Woven Shoulder Bag", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/9.png" },
  { id: 59, title: "Modern Artisan Sling", material: "Premium", category: "Sling & Shoulder Bag", img: "/images/enhanced_bags/Sling and Shoulder Bag/10.png" },
];
