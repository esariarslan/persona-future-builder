
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file-upload">Upload Assessment Documents</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? "border-persona-blue bg-persona-blue/10" : "border-gray-300 hover:border-persona-blue"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-sm text-gray-600 mb-1">
          {file ? `Selected: ${file.name}` : "Drag and drop files here or click to browse"}
        </p>
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, DOC, DOCX (Max size: 10MB)
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>
      
      {file && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
          <span className="text-sm truncate">{file.name}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setFile(null)}
          >
            Remove
          </Button>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <p>You can upload assessment reports, teacher observations, or any other relevant documents.</p>
      </div>
    </div>
  );
};

export default FileUpload;
