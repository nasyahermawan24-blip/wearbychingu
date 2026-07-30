import { Category } from "@/types/category";

interface Props {
  categories: Category[];
}

export default function CategoryTable({
  categories,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">

      <table className="w-full">

        <thead className="bg-zinc-900">

          <tr>

            <th className="p-4 text-left text-pink-500">
              Name
            </th>

            <th className="p-4 text-left text-pink-500">
              Slug
            </th>

            <th className="p-4 text-left text-pink-500">
              Description
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-t border-zinc-800"
            >

              <td className="p-4">
                {category.name}
              </td>

              <td className="p-4">
                {category.slug}
              </td>

              <td className="p-4">
                {category.description}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}