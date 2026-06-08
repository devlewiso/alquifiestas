import { categories } from "@/lib/seeds/categories";
import { CategoryCard } from "@/components/products/CategoryCard";

export const metadata = {
  title: "Categorías — Alquifiestas",
  description: "Explora todas las categorías de productos y servicios para eventos en Guatemala.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Categorías</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Encuentra todo lo que necesitas para tu evento. Desde sillas y mesas hasta catering, sonido y decoración.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} variant="default" />
        ))}
      </div>
    </div>
  );
}
