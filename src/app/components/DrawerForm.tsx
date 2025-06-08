"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type Field = {
  name: string;
  placeholder: string;
  type?: "text" | "textarea";
};

export default function DrawerForm({
  open,
  onClose,
  onSubmit,
  fields,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fields: Field[];
}) {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSubmit(formData);
    setFormData({});
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg shadow-xl">
          <Dialog.Title className="font-bold text-lg mb-2">
            Add Entry
          </Dialog.Title>
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === "textarea" ? (
                  <textarea
                    placeholder={field.placeholder}
                    className="border w-full p-2 rounded"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="border w-full p-2 rounded"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
