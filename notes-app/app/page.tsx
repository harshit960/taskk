import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Notes App</h1>
        <p className="text-muted-foreground text-lg max-w-[600px]">
          A simple and elegant solution to organize your thoughts, ideas, and important information.
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/notes">Get Started</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
        {features.map((feature) => (
          <div key={feature.title} className="border rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "Create Notes",
    description: "Write down your thoughts, ideas, or any information you want to remember.",
  },
  {
    title: "Organize",
    description: "Add tags to your notes to keep them organized and easily searchable.",
  },
  {
    title: "Simple Interface",
    description: "Clean and intuitive interface designed for the best user experience.",
  },
];
