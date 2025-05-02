import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Link } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

const LinkInsert = ({ editor }) => {
  const [showCard, setShowCard] = useState(false);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const handleInsertLink = () => {
    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        target: openInNewTab ? "_blank" : null,
      })
      .insertContent(text || url)   
      .run();

    setShowCard(false);
    setUrl("");
    setText("");
    setOpenInNewTab(false);
  };

  return (
    <div className="relative inline-block">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowCard(!showCard)}
      >
        <Link className="size-4" />
      </Button>

      {showCard && (
        <Card className="absolute right-1 mt-2 w-80 z-50 shadow-xl">
          <CardHeader>
            <h3 className="text-lg font-semibold">Insert Link</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Text</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text to display"
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="link..."
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-tab">Open in new tab</Label>
              <Switch
                id="new-tab"
                checked={openInNewTab}
                onCheckedChange={setOpenInNewTab}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" className="w-full" onClick={handleInsertLink}>
              Insert Link
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default LinkInsert;
