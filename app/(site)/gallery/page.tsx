import type { Metadata } from "next";

import { dictionary, defaultLocale } from "@/lib/dictionary";

import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: dictionary[defaultLocale].gallery.meta.title,
  description: dictionary[defaultLocale].gallery.meta.description,
};

export default function GalleryPage() {
  return <GalleryClient />;
}
