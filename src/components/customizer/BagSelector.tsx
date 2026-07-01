"use client";

import { useRef } from "react";
import Image from "next/image";
import { useCustomizer } from "./CustomizerContext";
import { collections } from "@/data/collections";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export function BagSelector() {
  const { activeBagImg, setActiveBagImg } = useCustomizer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get one unique bag from each category for the template selector
  const templates = collections.reduce((acc, current) => {
    const x = acc.find(item => item.category === current.category);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as typeof collections);

  const handleCustomBagUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result as string;
      setActiveBagImg(data);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">1. Choose Bag Type</Label>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((bag) => (
          <div
            key={bag.id}
            onClick={() => setActiveBagImg(bag.img)}
            className={`relative cursor-pointer border rounded-md overflow-hidden aspect-square bg-white hover:border-primary transition-colors ${
              activeBagImg === bag.img ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
          >
            <Image src={bag.img} alt={bag.category} fill sizes="120px" className="object-contain p-2" />
          </div>
        ))}
        {/* Custom Bag Upload Button */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border border-dashed rounded-md overflow-hidden aspect-square bg-muted/30 hover:bg-muted/50 hover:border-primary transition-colors flex flex-col items-center justify-center text-muted-foreground hover:text-primary"
        >
          <Upload className="w-5 h-5 mb-1" />
          <span className="text-[10px] text-center px-1 font-medium leading-tight">Custom<br/>Bag</span>
        </div>
      </div>
      
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleCustomBagUpload}
      />
    </div>
  );
}
