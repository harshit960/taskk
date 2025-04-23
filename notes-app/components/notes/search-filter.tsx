import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SearchFilterProps {
    title: string;
    onSearch: (query: string) => void;
    onFilterByTag: (tag: string) => void;
    activeTag: string | null;
    availableTags: string[];
    onCreateNote: () => void;
}

export function SearchFilter({
    title,
    onSearch,
    onFilterByTag,
    activeTag,
    availableTags,
    onCreateNote
}: SearchFilterProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    const uniqueTags = Array.from(new Set(availableTags)).sort();

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap space-y-4 w-full justify-between">

                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex gap-4">
                    <div>
                        <Input
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full"
                        />
                    </div>
                    <Button onClick={onCreateNote}>Create Note</Button>
                </div>

            </div>

            {uniqueTags.length > 0 && (
                <div>
                    <p className="text-sm font-medium mb-2">Filter by tag:</p>
                    <div className="flex flex-wrap gap-2">
                        {uniqueTags.map((tag) => (
                            <Button
                                key={tag}
                                variant={activeTag === tag ? "default" : "outline"}
                                size="sm"
                                onClick={() => onFilterByTag(tag)}
                                className="text-xs h-8"
                            >
                                {tag}
                            </Button>
                        ))}
                        {activeTag && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onFilterByTag("")}
                                className="text-xs h-8"
                            >
                                <X className="h-3 w-3 mr-1" /> Clear
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 