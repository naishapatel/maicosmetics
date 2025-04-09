
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const products = [
  {
    image: "/lovable-uploads/654bd682-892c-4eb6-8293-46bfa23291eb.png",
    alt: "Makeup lipstick"
  },
  {
    image: "https://images.unsplash.com/photo-1631214500076-0d30e7c39648",
    alt: "Makeup compact and brush"
  },
  {
    image: "https://images.unsplash.com/photo-1599733589046-d99f7d94d8a0",
    alt: "Perfume bottle"
  },
  {
    image: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6",
    alt: "Skincare product"
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 space-y-12">
      <h2 className="text-4xl text-center font-serif text-mai-brown">
        Our <span className="text-mai-darkRed">Featured Products</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {products.map((product, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.alt} 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
            />
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link to="/products">
          <Button 
            className="bg-mai-brown hover:bg-mai-brown/90 text-white px-8 py-6 rounded-full"
          >
            Browse all products
          </Button>
        </Link>
      </div>
    </section>
  );
};
