
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface BlogPostUploadProps {
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
}

export function BlogPostUpload({ onImageChange, imagePreview }: BlogPostUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Image preview */}
      {imagePreview && (
        <div className="relative mt-2">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-[200px] rounded-md object-contain" 
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => onImageChange(null)}
          >
            Remove
          </Button>
        </div>
      )}
      
      {/* Image upload button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Add Image
        </Button>
        <span className="text-xs text-gray-500">
          Supported formats: JPEG, PNG, GIF (max 5MB)
        </span>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
