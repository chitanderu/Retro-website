"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

const galleryItems = [
  {
    id: 1,
    title: "千反田愛瑠",
    src: "https://img.yuuki.diy/images.jpeg ",
  },
  {
    id: 2,
    title: "千反田愛瑠-學園祭",
    src: "https://img.yuuki.diy/IMG_0730.jpeg",
  },
  {
    id: 3,
    title: "千反田愛瑠 ",
    src: "https://img.yuuki.diy/d68ccae7bfa847a86cca41ed2a86eb8d37cec424.jpg@128w_128h_1c_1s.webp",
  },
  {
    id: 4,
    title: "千反田愛瑠-GIF",
    src: "https://img.yuuki.diy/X2Twitter.com_HATHXNZa4AAsqZx_gif.gif",
  },
  {
    id: 5,
    title: "神山高校文化祭",
    src: "https://img.yuuki.diy/wengao.jpeg",
  },
  {
    id: 6,
    title: "千の表紙",
    src: "https://img.yuuki.diy/qian.jpeg",
  },
  {
    id: 7,
    title: "古典部の部室",
    src: "https://img.yuuki.diy/20191029034518.jpg",
  },
  {
    id: 8,
    title: "桜と千反田",
    src: "https://img.yuuki.diy/IMG_4610.png",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = galleryItems.find((item) => item.id === selected);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading icon="✦">Gallery</SectionHeading>

      <p className="text-sm text-base-content/60">
        氷菓の名場面とアートワーク ✿
      </p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(item.id)}
            className="group aspect-square overflow-hidden rounded-box border-2 border-dashed border-secondary/20 bg-base-200 transition-colors hover:border-secondary/50"
          >
            <Image
              src={item.src}
              alt={item.title}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-base-content/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-lg border-2 border-dashed border-secondary/40 bg-base-100 p-6"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-pixel text-sm text-base-content">
                  {selectedItem.title}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="btn btn-ghost btn-sm font-pixel text-xs"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
