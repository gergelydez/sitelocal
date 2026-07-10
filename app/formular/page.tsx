import type { Metadata } from "next";
import FormularClient from "./FormularClient";

export const metadata: Metadata = {
  title: "Solicită Demo Gratuit Live — Site Local",
  description:
    "Completezi formularul, primești demo-ul live al site-ului tău în 24 de ore. Plătești doar dacă îți place.",
};

export default function FormularPage() {
  return <FormularClient />;
}
