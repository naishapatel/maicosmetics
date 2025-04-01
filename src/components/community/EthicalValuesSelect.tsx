
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface EthicalValuesSelectProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

export function EthicalValuesSelect({ selected, onChange }: EthicalValuesSelectProps) {
  const [searchValue, setSearchValue] = useState("");
  
  const availableValues = [
    "Cruelty-free",
    "Vegan",
    "Sustainable",
    "Eco-friendly",
    "Clean beauty",
    "Organic",
    "Natural ingredients",
    "Recycled packaging",
    "Fair trade",
    "Plastic-free",
    "Palm oil-free",
    "Ethically sourced",
    "Woman-owned",
    "BIPOC-owned",
    "LGBTQ+-owned",
    "Small business",
    "Zero waste",
    "Water conservation",
    "Carbon neutral",
    "Biodegradable"
  ];
  
  const filteredValues = searchValue 
    ? availableValues.filter(value => 
        value.toLowerCase().includes(searchValue.toLowerCase()))
    : availableValues;
  
  const handleToggle = (value: string) => {
    const isSelected = selected.includes(value);
    
    if (isSelected) {
      // Remove the value
      onChange(selected.filter(v => v !== value));
    } else {
      // Add the value
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search ethical values..."
        className="w-full p-2 border rounded-md"
      />
      
      <div className="flex flex-wrap gap-2 mt-2">
        {selected.map(value => (
          <Badge 
            key={value} 
            className="bg-mai-mauve hover:bg-mai-mauveDark cursor-pointer"
            onClick={() => handleToggle(value)}
          >
            {value} ✕
          </Badge>
        ))}
      </div>
      
      <div className="max-h-36 overflow-y-auto p-2 border rounded-md">
        <div className="flex flex-wrap gap-2">
          {filteredValues
            .filter(value => !selected.includes(value))
            .map(value => (
              <Badge 
                key={value} 
                variant="outline" 
                className="cursor-pointer hover:bg-mai-sage/20"
                onClick={() => handleToggle(value)}
              >
                {value}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
