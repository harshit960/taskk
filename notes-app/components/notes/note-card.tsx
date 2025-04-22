import { Note } from "@/types/note";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const { id, title, content, createdAt, updatedAt, tags } = note;
  
  const truncatedContent = content.length > 150 
    ? content.substring(0, 150) + "..." 
    : content;
  
  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription>Updated {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4 text-sm text-muted-foreground">{truncatedContent}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-secondary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/notes/${id}`}>View</Link>
        </Button>
        {onDelete && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 