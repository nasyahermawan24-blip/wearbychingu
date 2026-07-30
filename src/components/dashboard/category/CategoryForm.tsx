"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Props {
  onSubmit: (
    name: string,
    slug: string,
    description: string
  ) => Promise<void>;
}

export default function CategoryForm({
  onSubmit,
}: Props) {
  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [description, setDescription] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit(
      name,
      slug,
      description
    );

    setName("");
    setSlug("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <Input
        placeholder="Category Name"
        value={name}
        onChange={setName}
      />

      <Input
        placeholder="Slug"
        value={slug}
        onChange={setSlug}
      />

      <Input
        placeholder="Description"
        value={description}
        onChange={setDescription}
      />

      <Button type="submit">
        Save Category
      </Button>

    </form>
  );
}