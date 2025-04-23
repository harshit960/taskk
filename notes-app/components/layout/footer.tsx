export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="16" fill="#f3f4f6" className="dark:fill-gray-800" />
            <path d="M24 20H56C58.2091 20 60 21.7909 60 24V56C60 58.2091 58.2091 60 56 60H24C21.7909 60 20 58.2091 20 56V24C20 21.7909 21.7909 20 24 20Z" stroke="currentColor" strokeWidth="4" />
            <line x1="28" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="28" y1="40" x2="52" y2="40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="28" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Notes App
          </p>
        </div>
      </div>
    </footer>
  );
} 