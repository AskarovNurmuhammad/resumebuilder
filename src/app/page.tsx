"use client";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import html2pdf from "html2pdf.js";

// Interfeyslar
interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  technologies?: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface Language {
  language: string;
  level: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skills: string[];
  languages: Language[];
}

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [resume, setResume] = useState<ResumeData>({
    personalInfo: {
      name: "Askarov Nurmuhammad",
      title: "Software Engineer",
      location: "Buxoro, Uzbekistan",
      phone: "+998 90 123 45 67",
      email: "muhammad@gmail.com",
      summary: "1+ years experience in web development",
    },
    experiences: [
      {
        id: 1,
        company: "TechCorp",
        position: "Frontend Developer",
        startDate: "2022-01-01",
        endDate: "Present",
        description: "React va Next.js ilovalarini ishlab chiqish",
      },
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "To'liq funktsional online do'kon",
        technologies: "React, Node.js, MongoDB",
      },
    ],
    education: [
      {
        id: 1,
        institution: "Buxoro Texnologiyalari Universiteti",
        degree: "2-kurs",
        field: "Menejment",
        startDate: "2023",
        endDate: "2024",
      },
    ],
    skills: ["JavaScript", "React", "Node.js"],
    languages: [
      { language: "O'zbekcha", level: "Native" },
      { language: "Inglizcha", level: "Advanced" },
    ],
  });

  // Tajriba qo'shish
  const addExperience = (newExp: Omit<Experience, "id">) => {
    setResume((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { ...newExp, id: Date.now() }],
    }));
  };

  // Loyiha qo'shish
  const addProject = (newProject: Omit<Project, "id">) => {
    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...newProject, id: Date.now() }],
    }));
  };

  // Ta'lim qo'shish
  const addEducation = (newEdu: Omit<Education, "id">) => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, { ...newEdu, id: Date.now() }],
    }));
  };

  // Ko'nikma qo'shish
  const addSkill = (newSkill: string) => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  // Til qo'shish
  const addLanguage = (newLanguage: Language) => {
    setResume((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }));
  };

  // Element o'chirish
  const deleteItem = (section: keyof ResumeData, id: number) => {
    setResume((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item) => item.id !== id),
    }));
  };

  // PDF generatsiya qilish
  const handleDownloadPDF = () => {
    const element = contentRef.current;

    if (!element) {
      console.error("Preview element not found");
      return;
    }

    // Elementni klonlash va keraksiz elementlarni olib tashlash
    const clonedElement = element.cloneNode(true) as HTMLDivElement;
    const buttons = clonedElement.querySelectorAll("button");
    buttons.forEach((btn) => btn.remove());

    const options = {
      margin: 10,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(clonedElement)
      .save()
      .catch((error: Error) => {
        console.error("PDF generation error:", error);
        alert(
          "PDF yaratishda xatolik yuz berdi. Iltimos, qayta urunib ko'ring."
        );
      });
  };

  // Input maydoni komponenti
  const InputField = ({ label, value, onChange, ...props }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        className="w-full p-2 border rounded"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );

  // Bo'lim komponenti
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );

  // Tajriba kartasi
  const ExperienceCard = ({
    data,
    onDelete,
  }: {
    data: Experience;
    onDelete: () => void;
  }) => (
    <div className="mb-4 p-3 border rounded relative group">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"
      >
        ×
      </button>
      <h3 className="font-bold">{data.company}</h3>
      <p>{data.position}</p>
      <p className="text-sm text-gray-500">
        {data.startDate} - {data.endDate}
      </p>
      {data.description && <p className="mt-1">{data.description}</p>}
    </div>
  );

  // Loyiha kartasi
  const ProjectCard = ({
    data,
    onDelete,
  }: {
    data: Project;
    onDelete: () => void;
  }) => (
    <div className="mb-4 p-3 border rounded relative group">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"
      >
        ×
      </button>
      <h3 className="font-bold">{data.name}</h3>
      <p>{data.description}</p>
      {data.technologies && (
        <p className="text-sm text-gray-500">{data.technologies}</p>
      )}
    </div>
  );

  // Ta'lim kartasi
  const EducationCard = ({
    data,
    onDelete,
  }: {
    data: Education;
    onDelete: () => void;
  }) => (
    <div className="mb-4 p-3 border rounded relative group">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"
      >
        ×
      </button>
      <h3 className="font-bold">{data.institution}</h3>
      <p>
        {data.degree} in {data.field}
      </p>
      <p className="text-sm text-gray-500">
        {data.startDate} - {data.endDate}
      </p>
    </div>
  );

  // Yangi element qo'shish dialogi
  const AddItemDialog = ({
    title,
    fields,
    onSave,
  }: {
    title: string;
    fields: { name: string; label: string; type?: string }[];
    onSave: (data: any) => void;
  }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
      setOpen(false);
      setFormData({});
    };

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="px-3 py-1 border rounded text-sm">
          + Add
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-full max-w-md">
            <Dialog.Title className="font-bold mb-3">{title}</Dialog.Title>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                />
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close className="px-3 py-1 border rounded">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

  // Preview komponenti
  const ResumePreview = ({ data }: { data: ResumeData }) => {
    return (
      <div
        ref={contentRef}
        id="resume-preview"
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          maxWidth: "42rem",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {data.personalInfo.name}
          </h3>
          <p style={{ color: "#4B5563" }}>{data.personalInfo.title}</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            <span>{data.personalInfo.location}</span>
            <span>•</span>
            <span>{data.personalInfo.phone}</span>
            <span>•</span>
            <span>{data.personalInfo.email}</span>
          </div>
        </div>

        {data.personalInfo.summary && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              SUMMARY
            </h4>
            <p>{data.personalInfo.summary}</p>
          </div>
        )}

        {data.experiences.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              EXPERIENCE
            </h4>
            {data.experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "0.75rem" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 style={{ fontWeight: "bold" }}>{exp.company}</h4>
                  <span style={{ color: "#6B7280" }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p style={{ color: "#4B5563" }}>{exp.position}</p>
                {exp.description && (
                  <p style={{ marginTop: "0.25rem" }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              PROJECTS
            </h3>
            {data.projects.map((project) => (
              <div key={project.id} style={{ marginBottom: "0.75rem" }}>
                <h5 style={{ fontWeight: "bold" }}>{project.name}</h5>
                <p>{project.description}</p>
                {project.technologies && (
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                    {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              EDUCATION
            </h3>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "0.75rem" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ fontWeight: "bold" }}>{edu.institution}</h5>
                  <span style={{ color: "#6B7280" }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p>
                  {edu.degree} in {edu.field}
                </p>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              SKILLS
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#F3F4F6",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              LANGUAGES
            </h3>
            {data.languages.map((lang, i) => (
              <div key={i} style={{ marginBottom: "0.25rem" }}>
                <span style={{ fontWeight: 500 }}>{lang.language}:</span>{" "}
                {lang.level}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor qismi */}
          <div>
            <Section title="Personal Information">
              <InputField
                label="Full Name"
                value={resume.personalInfo.name}
                onChange={(e) =>
                  setResume((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      name: e.target.value,
                    },
                  }))
                }
              />
              <InputField
                label="Job Title"
                value={resume.personalInfo.title}
                onChange={(e) =>
                  setResume((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      title: e.target.value,
                    },
                  }))
                }
              />
              <InputField
                label="Location"
                value={resume.personalInfo.location}
                onChange={(e) =>
                  setResume((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      location: e.target.value,
                    },
                  }))
                }
              />
              <InputField
                label="Phone"
                value={resume.personalInfo.phone}
                onChange={(e) =>
                  setResume((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      phone: e.target.value,
                    },
                  }))
                }
              />
              <InputField
                label="Email"
                value={resume.personalInfo.email}
                onChange={(e) =>
                  setResume((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      email: e.target.value,
                    },
                  }))
                }
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Summary
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={resume.personalInfo.summary}
                  onChange={(e) =>
                    setResume((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        summary: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </Section>

            <Section title="Experience">
              {resume.experiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  data={exp}
                  onDelete={() => deleteItem("experiences", exp.id)}
                />
              ))}
              <AddItemDialog
                title="Add Experience"
                fields={[
                  { name: "company", label: "Company" },
                  { name: "position", label: "Position" },
                  { name: "startDate", label: "Start Date", type: "date" },
                  { name: "endDate", label: "End Date", type: "date" },
                  { name: "description", label: "Description" },
                ]}
                onSave={addExperience}
              />
            </Section>

            <Section title="Projects">
              {resume.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  data={project}
                  onDelete={() => deleteItem("projects", project.id)}
                />
              ))}
              <AddItemDialog
                title="Add Project"
                fields={[
                  { name: "name", label: "Project Name" },
                  { name: "description", label: "Description" },
                  { name: "technologies", label: "Technologies" },
                ]}
                onSave={addProject}
              />
            </Section>

            <Section title="Education">
              {resume.education.map((edu) => (
                <EducationCard
                  key={edu.id}
                  data={edu}
                  onDelete={() => deleteItem("education", edu.id)}
                />
              ))}
              <AddItemDialog
                title="Add Education"
                fields={[
                  { name: "institution", label: "Institution" },
                  { name: "degree", label: "Degree" },
                  { name: "field", label: "Field of Study" },
                  { name: "startDate", label: "Start Date", type: "date" },
                  { name: "endDate", label: "End Date", type: "date" },
                ]}
                onSave={addEducation}
              />
            </Section>

            <Section title="Skills">
              <div className="flex flex-wrap gap-2 mb-3">
                {resume.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 bg-gray-100 rounded flex items-center"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() =>
                        setResume((prev) => ({
                          ...prev,
                          skills: prev.skills.filter((_, index) => index !== i),
                        }))
                      }
                      className="ml-1 text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-l"
                  placeholder="New skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      addSkill(e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector(
                      'input[placeholder="New skill"]'
                    ) as HTMLInputElement;
                    if (input?.value.trim()) {
                      addSkill(input.value.trim());
                      input.value = "";
                    }
                  }}
                  className="px-3 bg-blue-500 text-white rounded-r"
                >
                  Add
                </button>
              </div>
            </Section>

            <Section title="Languages">
              {resume.languages.map((lang, i) => (
                <div key={i} className="mb-2 flex items-center">
                  <input
                    type="text"
                    className="p-2 border rounded mr-2"
                    value={lang.language}
                    onChange={(e) =>
                      setResume((prev) => {
                        const newLanguages = [...prev.languages];
                        newLanguages[i].language = e.target.value;
                        return { ...prev, languages: newLanguages };
                      })
                    }
                  />
                  <input
                    type="text"
                    className="p-2 border rounded mr-2"
                    value={lang.level}
                    onChange={(e) =>
                      setResume((prev) => {
                        const newLanguages = [...prev.languages];
                        newLanguages[i].level = e.target.value;
                        return { ...prev, languages: newLanguages };
                      })
                    }
                  />
                  <button
                    onClick={() =>
                      setResume((prev) => ({
                        ...prev,
                        languages: prev.languages.filter(
                          (_, index) => index !== i
                        ),
                      }))
                    }
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => addLanguage({ language: "", level: "" })}
                className="px-3 py-1 border rounded text-sm"
              >
                + Add Language
              </button>
            </Section>
          </div>

          {/* Preview qismi */}
          <div className="sticky top-4 h-fit">
            <ResumePreview data={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
