import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailsFieldsProps {
  values: {
    product_name: string;
    brand: string;
    category: string;
    makeup_type: string;
    price: string;
    description: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ProductDetailsFields({ values, onChange }: ProductDetailsFieldsProps) {
  return (
    <>
      <Input
        placeholder="Product Name"
        value={values.product_name}
        onChange={(e) => onChange("product_name", e.target.value)}
        required
      />
      <Input
        placeholder="Brand"
        value={values.brand}
        onChange={(e) => onChange("brand", e.target.value)}
        required
      />
      <Select
        value={values.category}
        onValueChange={(value) => onChange("category", value)}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="skincare">Skincare</SelectItem>
          <SelectItem value="makeup">Makeup</SelectItem>
          <SelectItem value="haircare">Haircare</SelectItem>
          <SelectItem value="bodycare">Bodycare</SelectItem>
          <SelectItem value="fragrance">Fragrance</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={values.makeup_type}
        onValueChange={(value) => onChange("makeup_type", value)}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Makeup Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="foundation">Foundation</SelectItem>
          <SelectItem value="concealer">Concealer</SelectItem>
          <SelectItem value="blush">Blush</SelectItem>
          <SelectItem value="bronzer">Bronzer</SelectItem>
          <SelectItem value="eyeshadow">Eyeshadow</SelectItem>
          <SelectItem value="mascara">Mascara</SelectItem>
          <SelectItem value="lipstick">Lipstick</SelectItem>
          <SelectItem value="none">None</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Price"
        type="text"
        value={values.price}
        onChange={(e) => onChange("price", e.target.value)}
        required
      />
      <Textarea
        placeholder="Why do you recommend this product?"
        value={values.description}
        onChange={(e) => onChange("description", e.target.value)}
        required
      />
    </>
  );
}