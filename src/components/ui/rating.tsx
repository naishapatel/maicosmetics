import * as React from "react"
import { Star } from "lucide-react"

interface RatingProps {
  value: number
  onChange: (value: number) => void
}

export function Rating({ value, onChange }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="focus:outline-none"
        >
          <Star
            className={`w-5 h-5 ${
              rating <= value
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}