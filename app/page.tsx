import { Hero } from "@/components/Hero";
import { AnalyzerForm } from "@/components/AnalyzerForm";
import { EducationalGuide } from "@/components/EducationalGuide";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Hero />
      <AnalyzerForm />
      <EducationalGuide />
    </main>
  );
}
