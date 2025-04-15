
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, PackageOpen, Recycle } from "lucide-react";

export function SustainableBeautyTips() {
  const tips = [
    {
      title: "Use Less, But Better",
      description: "Invest in multi-purpose products that can be used in different ways, reducing the total number of products you need.",
      icon: <Leaf className="h-5 w-5 text-emerald-600" />,
      image: "/lovable-uploads/039a22d4-7c4a-40f1-a07b-4b2d92ba15ae.png"
    },
    {
      title: "Choose Water-Conscious Brands",
      description: "Support brands that use sustainable water practices and formulate water-efficient products.",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      image: "/lovable-uploads/8936d617-9458-4384-ad0a-d6c202e51c95.png"
    },
    {
      title: "Look for Sustainable Packaging",
      description: "Opt for products with minimal, recyclable, or refillable packaging to reduce waste.",
      icon: <PackageOpen className="h-5 w-5 text-amber-600" />,
      image: "/lovable-uploads/b9f55779-4934-471a-acff-f18a7ad69e55.png"
    },
    {
      title: "Embrace Upcycling",
      description: "Repurpose empty containers for storage or DIY projects instead of throwing them away.",
      icon: <Recycle className="h-5 w-5 text-purple-500" />,
      image: "/lovable-uploads/97be402a-167d-4058-ba45-6b24eb68121b.png"
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-mai-sage/20 rounded-lg overflow-hidden border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-serif text-mai-brown">
            Sustainable Beauty Tips
          </CardTitle>
          <CardDescription>
            Simple ways to make your beauty routine more eco-friendly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div 
                key={tip.title} 
                className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="w-full md:w-1/3 aspect-square rounded-md overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 bg-mai-cream/40 p-1.5 rounded-full">
                      {tip.icon}
                    </div>
                    <h3 className="font-medium text-mai-brown">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
