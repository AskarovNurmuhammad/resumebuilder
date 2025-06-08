"use client";

import { useState } from "react";
import DrawerForm from "./DrawerForm";

export default function PersonalInfoSection() {
  const [items, setItems] = useState([{ id: 1, name: "John Doe" }]);
  const [open, setOpen] = useState(false);

  const handleAdd = (data: any) => {
    setItems([...items, { id: Date.now(), ...data }]);
    setOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Personal Info</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          + Add
        </button>
      </div>
      <ul className="mt-2 list-disc list-inside">
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <DrawerForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAdd}
        placeholder="Full Name"
      />
    </div>
  );
}
