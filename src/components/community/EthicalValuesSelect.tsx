import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const ETHICAL_VALUES = [
  { id: "vegan", label: "Vegan" },
  { id: "natural", label: "Natural" },
  { id: "sustainable", label: "Sustainable" },
  { id: "eco-friendly", label: "Eco-Friendly" },
  { id: "cruelty-free", label: "Cruelty-Free" },
  { id: "organic", label: "Organic" },
  { id: "fair-trade", label: "Fair Trade" },
] as const;

interface EthicalValuesSelectProps {
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
}

export function EthicalValuesSelect({ selectedValues, onValueChange }: EthicalValuesSelectProps) {
  return (
    <div className="space-y-4">
      <Label>Ethical Values</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ETHICAL_VALUES.map((value) => (
          <div key={value.id} className="flex items-center space-x-2">
            <Checkbox
              id={value.id}
              checked={selectedValues.includes(value.id)}
              onCheckedChange={(checked) => 
                onValueChange(value.id, checked as boolean)
              }
            />
            <Label 
              htmlFor={value.id} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {value.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}