"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import {
  createCategory,
  getCategories,
} from "@/services/category.service";

import { Category } from "@/types/category";

import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function CategoryPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [openModal, setOpenModal] =
    useState(false);

  async function loadCategories() {
    const data =
      await getCategories();

    setCategories(data);
  }

  useEffect(() => {

    async function checkUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("==============");
      console.log("CURRENT USER");
      console.log(user);
      console.log("==============");

    }

    checkUser();
    loadCategories();

  }, []);

  async function handleCreate(
    name: string,
    slug: string,
    description: string
  ) {

    await createCategory({
      name,
      slug,
      description,
    });

    await loadCategories();

    setOpenModal(false);
  }

  return (
    <div>

      <div className="flex justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-pink-500">
            Categories
          </h1>

          <p className="text-gray-400">
            Manage marketplace categories
          </p>

        </div>

        <Button
          onClick={() =>
            setOpenModal(true)
          }
        >
          + Add Category
        </Button>

      </div>

      <CategoryTable
        categories={categories}
      />

      <Modal
        open={openModal}
        title="Add Category"
        onClose={() =>
          setOpenModal(false)
        }
      >
        <CategoryForm
          onSubmit={handleCreate}
        />
      </Modal>

    </div>
  );
}