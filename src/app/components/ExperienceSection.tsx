"use client";

import { useState } from "react";
import DrawerForm from "./DrawerForm";

interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [open, setOpen] = useState(false);

  const handleAdd = (data: ExperienceItem) => {
    setItems([...items, data]);
    setOpen(false);
  };

  return (
    <div className="border p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-xl">Experience</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-gray-500">No experiences added.</p>
      )}
      <ul className="space-y-2">
        {items.map((exp, i) => (
          <li key={i} className="border-b pb-2">
            <b>{exp.company}</b> — {exp.role}
            <br />
            <span className="text-sm">
              {exp.startDate} - {exp.endDate}
            </span>
            <p className="text-sm">{exp.description}</p>
          </li>
        ))}
      </ul>

      <DrawerForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAdd}
        fields={[
          { name: "company", placeholder: "Company Name" },
          { name: "role", placeholder: "Role" },
          { name: "startDate", placeholder: "Start Date" },
          { name: "endDate", placeholder: "End Date" },
          { name: "description", placeholder: "Description", type: "textarea" },
        ]}
      />
    </div>
  );
}
