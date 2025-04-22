import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/contexts/auth-context";
import { Note } from "@/types/note";
import { useState } from "react";

interface NoteFormProps {
  initialValues?: Partial<Note>;
  onSubmit: (data: { title: string; content: string; user_id: string; tags?: string[] }) => void;
  onCancel?: () => void;
}

export function NoteForm({ initialValues, onSubmit, onCancel }: NoteFormProps) {
  const { user, isLoading, refreshSession } = useAuth();
  const [title, setTitle] = useState(initialValues?.title || "");
  const [content, setContent] = useState(initialValues?.content || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      user_id: user?.id || '',
      tags: tags.length > 0 ? tags : undefined,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.currentTarget === document.activeElement) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium">
          Tags
        </label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag"
          />
          <Button type="button" onClick={handleAddTag} variant="secondary">
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
} 