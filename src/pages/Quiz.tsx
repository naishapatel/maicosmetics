import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Quiz = () => {
  return (
    <div className="min-h-screen bg-mai-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Skin Quiz</h1>
          <p className="text-gray-600">Let's find the perfect products for your skin</p>
        </motion.div>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-mai-brown">Tell us about your skin</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="type" className="w-full">
              <TabsList className="w-full mb-8">
                <TabsTrigger value="type" className="flex-1">Skin Type</TabsTrigger>
                <TabsTrigger value="concerns" className="flex-1">Skin Concerns</TabsTrigger>
                <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Dry", "Oily", "Combination", "Normal", "Sensitive"].map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start hover:bg-mai-rose/20"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="concerns" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Acne", "Redness", "Dark spots", "Fine lines", "Uneven texture"].map((concern) => (
                    <Button
                      key={concern}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start hover:bg-mai-rose/20"
                    >
                      {concern}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free"].map((pref) => (
                    <Button
                      key={pref}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start hover:bg-mai-rose/20"
                    >
                      {pref}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 flex justify-end">
              <Button className="bg-mai-coral hover:bg-mai-brown text-white transition-colors">
                Get Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;