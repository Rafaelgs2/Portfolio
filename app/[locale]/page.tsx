import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Experience />
      <Contact />
    </main>
  );
}
