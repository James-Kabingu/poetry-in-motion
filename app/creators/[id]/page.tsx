"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, CheckCircle2, Star, Users, Award, DollarSign } from "lucide-react"
import { getCreatorById } from "@/lib/creators"
import { NavLogo } from "@/components/nav-logo"
import { products } from "@/lib/products"

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const creator = getCreatorById(id)
  const creatorProducts = products.filter((p) => p.creatorId === id)

  if (!creator) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Creator Not Found</h1>
          <Link href="/creators"><Button className="mt-4">Back to Creators</Button></Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <NavLogo size="sm" />
          <Link href="/creators" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" />
            Creators
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-muted flex-shrink-0 border-2 border-accent/30">
            <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{creator.name}</h1>
              {creator.verified && (
                <CheckCircle2 className="h-5 w-5 text-accent fill-accent/20" />
              )}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-2">
              <MapPin className="h-3.5 w-3.5" />
              {creator.location}
            </p>
            <p className="text-sm text-foreground max-w-xl">{creator.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Designs</p>
                <p className="text-xl font-bold text-foreground">{creator.totalDesigns}</p>
              </div>
              <Star className="h-5 w-5 text-accent/50" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Votes</p>
                <p className="text-xl font-bold text-foreground">{creator.totalVotes.toLocaleString()}</p>
              </div>
              <Users className="h-5 w-5 text-accent/50" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Produced</p>
                <p className="text-xl font-bold text-foreground">{creator.producedCollections}</p>
              </div>
              <Award className="h-5 w-5 text-accent/50" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Revenue Share</p>
                <p className="text-xl font-bold text-foreground">{creator.revenueShare}%</p>
              </div>
              <DollarSign className="h-5 w-5 text-accent/50" />
            </div>
          </Card>
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              Products by {creator.name} <span className="text-muted-foreground font-normal text-base">({creatorProducts.length})</span>
            </h2>
            {creatorProducts.length > 0 && (
              <Link href={`/shop?creator=${creator.id}`}>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Shop All
                </Button>
              </Link>
            )}
          </div>

          {creatorProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {creatorProducts.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition group cursor-pointer h-full flex flex-col">
                    <div className="relative overflow-hidden bg-muted aspect-square">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 space-y-1.5 flex-1 flex flex-col">
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
                      </div>
                      <p className="font-bold text-foreground mt-auto pt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">This creator has not listed any products yet.</p>
          )}
        </div>

      </div>
    </main>
  )
}
