import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Star, Phone, Mail, Award, Calendar, Clock } from "lucide-react";
import { seedProviders } from "@/lib/seeds/providers";
import { seedProducts } from "@/lib/seeds/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProviderPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return seedProviders.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: ProviderPageProps) {
  const provider = seedProviders.find((p) => p.id === params.id);
  if (!provider) return {};
  return {
    title: `${provider.business_name} — Alquifiestas`,
    description: provider.description,
  };
}

export default function ProviderPage({ params }: ProviderPageProps) {
  const provider = seedProviders.find((p) => p.id === params.id);
  if (!provider) return notFound();

  const products = seedProducts.filter((p) => p.provider_id === params.id);

  return (
    <div>
      {/* Cover */}
      <div className="relative h-48 sm:h-64 md:h-80"
      >
        <Image
          src={provider.cover_url}
          alt={provider.business_name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start"
        >
          {/* Avatar */}
          <div className="w-32 h-32 rounded-2xl border-4 border-background overflow-hidden bg-card shadow-lg shrink-0"
          >
            <Image
              src={provider.image_url}
              alt={provider.business_name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info */}
          <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2"
            >
              {provider.is_verified && (
                <Badge variant="verified"
                >
                  <Award className="w-3 h-3 mr-1" /> Verificado
                </Badge>
              )}
              <Badge variant="secondary"
              >{provider.department}</Badge>
            </div>
            <h1 className="text-2xl font-bold"
            >{provider.business_name}</h1>
            <p className="text-muted-foreground mt-2"
            >{provider.description}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm"
            >
              <div className="flex items-center gap-1 text-yellow-600"
              >
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{provider.rating}</span>
                <span className="text-muted-foreground">({provider.review_count} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground"
              >
                <MapPin className="w-4 h-4" />
                {provider.location}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground"
              >
                <Clock className="w-4 h-4" />
                {provider.years_experience} años de experiencia
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6"
            >
              <Button size="sm" className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reservar
              </Button>
              <Button variant="outline" size="sm" className="gap-2"
              >
                <Phone className="w-4 h-4" />
                {provider.phone}
              </Button>
              <Button variant="outline" size="sm" className="gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-12"
        >
          <h2 className="text-xl font-bold mb-6"
          >Productos y servicios ({products.length})</h2>
          {products.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-border rounded-xl"
            >
              Este proveedor aún no tiene productos publicados.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
