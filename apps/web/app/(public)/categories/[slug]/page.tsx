import { notFound } from "next/navigation";
import { categories } from "@/lib/seeds/categories";
import { seedProducts } from "@/lib/seeds/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: `${category.name} — Alquifiestas`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return notFound();

  const products = seedProducts.filter((p) => p.category_slug === params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Badge variant="secondary">{category.productCount} productos</Badge>
        <h1 className="text-3xl font-bold mt-2">{category.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No hay productos en esta categoría todavía.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
