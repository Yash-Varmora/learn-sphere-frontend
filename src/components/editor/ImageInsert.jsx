import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ImagePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";

const ImageInsert = ({ editor }) => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
    const [tab, setTab] = useState("url");
    const [open, setOpen] = useState(false);

  const handleInsert = async () => {
    if (tab === "url" && url) {
      editor.chain().focus().setImage({ src: url }).run();
        setUrl("");
        setOpen(false)
    } else if (tab === "upload" && file) {
      const formData = new FormData();
      formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESETS);
        formData.append("folder", "LearnSphere")

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          editor.chain().focus().setImage({ src: data.secure_url }).run();
            setFile(null);
            setOpen(false)
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ImagePlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="url" value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="mt-4 space-y-2">
            <Input
              type="url"
              placeholder="Enter image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-4 space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={handleInsert}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageInsert;
