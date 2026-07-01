"use client";

import { CustomizerProvider } from "@/components/customizer/CustomizerContext";
import { ControlsSidebar } from "@/components/customizer/ControlsSidebar";
import { DesignCanvas } from "@/components/customizer/DesignCanvas";

export function DesignExperience() {
  return (
    <CustomizerProvider>
      <div className="flex flex-col h-[100dvh] pt-[64px] overflow-hidden bg-gradient-to-br from-[#f5ebff] via-background to-[#ffeef8] dark:from-[#2e1f40] dark:via-background dark:to-[#381e30]">
        <div className="container mx-auto px-4 md:px-8 py-4 flex-1 flex flex-col h-full overflow-hidden">

          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight font-lora">
              Design Your Bag
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Select a bag, add your text, choose fonts and colors, or upload your own custom logo.
              Download the preview when you're done!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 h-full pb-4">
            {/* Sidebar Controls */}
            <ControlsSidebar />

            {/* Main Canvas Area */}
            <div className="flex-1 rounded-xl shadow-sm bg-card border overflow-hidden p-2">
              <DesignCanvas />
            </div>
          </div>

        </div>
      </div>
    </CustomizerProvider>
  );
}
