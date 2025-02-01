import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const SKIN_BENEFITS = [
  { id: "hydrating", label: "Hydrating" },
  { id: "brightening", label: "Brightening" },
  { id: "mattifying", label: "Mattifying" },
  { id: "soothing", label: "Soothing" },
  { id: "anti-aging", label: "Anti-Aging" },
  { id: "pore-minimizing", label: "Pore Minimizing" },
  { id: "oil-control", label: "Oil Control" },
] as const;

interface SkinBenefitsSelectProps {
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
}

export function SkinBenefitsSelect({ selectedValues, onValueChange }: SkinBenefitsSelectProps) {
  return (
    <div className="space-y-4">
      <Label>Skin Benefits</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SKIN_BENEFITS.map((value) => (
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