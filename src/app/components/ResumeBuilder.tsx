import Experience from "./ExperienceSection";

export default function ResumeBuilder() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Resume Builder</h1>
      <Experience />
    </div>
  );
}
