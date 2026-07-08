import type { Metadata } from "next";
import { HomeContent, thaiHomeMetadata } from "@/app/page";

export function generateMetadata(): Metadata {
  return thaiHomeMetadata();
}

export default function ThaiHomePage() {
  return <HomeContent locale="th" />;
}
