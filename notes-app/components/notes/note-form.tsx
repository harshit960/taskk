import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/contexts/auth-context";
import { useSummarizeNote } from "@/lib/services/api-notes-service";
import { Note } from "@/types/note";
import { useState } from "react";

interface NoteFormProps {
  initialValues?: Partial<Note>;
  onSubmit: (data: { title: string; content: string; user_id: string; tags?: string[] }) => void;
  onCancel?: () => void;
}

export function NoteForm({ initialValues, onSubmit, onCancel }: NoteFormProps) {
  const summarizeNoteMutation = useSummarizeNote();

  const { user, isLoading, refreshSession } = useAuth();
  const [title, setTitle] = useState(initialValues?.title || "");
  const [content, setContent] = useState(initialValues?.content || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  const handleSummarize = async () => {
    if (!content.trim()) return;
    
    try {
      const res = await summarizeNoteMutation.mutateAsync(content);
      setContent(res.summary);
    } catch (error) {
      console.error('Failed to summarize note:', error);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    onSubmit({
      title: title.trim() || "",
      content: content.trim() || "",
      user_id: user?.id || '',
      tags: tags.length > 0 ? tags : undefined,
    });
    
    // Note: If the onSubmit is async, you'd typically want to reset isSubmitting
    // in the parent component after the submission is complete
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
          placeholder="Note title (Ai will generate a title if left blank)"
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </div>

          <Button type="button" onClick={handleSummarize} variant="secondary" disabled={isSubmitting}>
            Summarize
          </Button>
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
            placeholder="Add a tag (Ai will generate tags if left blank)"
            disabled={isSubmitting}
          />
          <Button type="button" onClick={handleAddTag} variant="outline" disabled={isSubmitting}>
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
                  disabled={isSubmitting}
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
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
} 