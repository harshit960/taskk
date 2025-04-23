import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center relative overflow-hidden">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto pt-10 pb-20 px-4 md:px-6">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The smarter notes app
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Organize your thoughts with AI-powered tools and tag-based organization.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button size="lg" className="bg-black hover:bg-gray-800 rounded-md">
              <Link href="/register">Get started for free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>

        <div className="text-center mb-14">
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Built with modern technologies</p>
          <div className="flex flex-wrap justify-center gap-10 items-center">
            {['Next.js', 'Supabase', 'Prisma', 'TanStack Query'].map((tech, index) => (
              <div key={index} className="text-gray-400 dark:text-gray-500 font-semibold">{tech}</div>
            ))}
          </div>
        </div>
        {/* App Preview */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mx-auto max-w-full md:h-[560px]">
          <div className="absolute top-0 inset-x-0 h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            </div>
            <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">notes-app</div>
          </div>
          <div className="pt-12 h-full">
            <div className="h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 55 1200 550" fill="none" preserveAspectRatio="xMidYMid meet">
                {/* App Container */}
                <rect width="1200" height="800" fill="#FAFAFA" />

                {/* Top Bar */}
                <rect width="1200" height="48" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
                <rect width="140" height="30" x="20" y="9" rx="4" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
                <circle cx="35" cy="24" r="8" fill="#EEEEEE" />
                <rect width="80" height="6" x="50" y="21" rx="3" fill="#BDBDBD" />

                {/* Search Bar */}
                <rect width="240" height="32" x="480" y="8" rx="16" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
                <circle cx="496" cy="24" r="8" fill="#EEEEEE" />
                <rect width="140" height="4" x="512" y="22" rx="2" fill="#BDBDBD" />

                {/* Top Nav Icons */}
                <circle cx="1080" cy="24" r="14" fill="#EEEEEE" />
                <circle cx="1130" cy="24" r="14" fill="#EEEEEE" />
                <rect width="16" height="2" x="1072" y="24" rx="1" fill="#9E9E9E" />
                <rect width="10" height="10" x="1125" y="19" rx="2" fill="#9E9E9E" />

                {/* Sidebar */}
                <rect width="240" height="752" y="48" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />

                {/* Sidebar Header */}
                <rect width="200" height="36" x="20" y="70" rx="4" fill="#EEEEEE" />
                <rect width="100" height="8" x="50" y="84" rx="4" fill="#BDBDBD" />
                <circle cx="30" cy="88" r="10" fill="#E0E0E0" />

                {/* Sidebar Items */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <g key={`sidebar-item-${i}`}>
                    <rect
                      width={i === 1 ? 200 : 180}
                      height="32"
                      x={i === 1 ? 20 : 30}
                      y={130 + i * 45}
                      rx="4"
                      fill={i === 1 ? "#E0E0E0" : "transparent"}
                    />
                    <rect width="16" height="16" x="50" y={138 + i * 45} rx="2" fill="#BDBDBD" />
                    <rect width="100" height="6" x="80" y={143 + i * 45} rx="3" fill="#BDBDBD" />
                  </g>
                ))}

                {/* Main Content Area */}
                <rect width="960" height="752" x="240" y="48" fill="#FFFFFF" />

                {/* Content Header */}
                <rect width="920" height="60" x="260" y="70" fill="#FAFAFA" stroke="#F5F5F5" strokeWidth="1" />
                <rect width="400" height="16" x="280" y="92" rx="2" fill="#424242" />

                {/* Toolbar */}
                <rect width="920" height="40" x="260" y="140" fill="#FAFAFA" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <rect key={`tool-${i}`} width="32" height="32" x={280 + i * 40} y="144" rx="4" fill="#EEEEEE" />
                ))}

                {/* Content Blocks */}
                <rect width="800" height="24" x="280" y="200" rx="2" fill="#424242" />

                {[0, 1, 2, 3, 4].map(i => (
                  <g key={`paragraph-${i}`}>
                    <rect width={700 - i * 50} height="8" x="280" y={240 + i * 30} rx="4" fill="#BDBDBD" />
                    <rect width={650 + i * 20} height="8" x="280" y={252 + i * 30} rx="4" fill="#BDBDBD" />
                  </g>
                ))}

                {/* Quote Block */}
                <rect width="760" height="80" x="280" y="400" rx="4" fill="#F5F5F5" />
                <rect width="4" height="70" x="290" y="405" fill="#9E9E9E" />
                <rect width="700" height="8" x="310" y="420" rx="4" fill="#BDBDBD" />
                <rect width="680" height="8" x="310" y="436" rx="4" fill="#BDBDBD" />
                <rect width="650" height="8" x="310" y="452" rx="4" fill="#BDBDBD" />

                {/* Checklist */}
                {[0, 1, 2].map(i => (
                  <g key={`checklist-${i}`}>
                    <rect width="16" height="16" x="280" y={510 + i * 30} rx="2" fill={i < 2 ? "#9E9E9E" : "#EEEEEE"} />
                    <rect width={200 + i * 100} height="8" x="310" y={514 + i * 30} rx="4" fill="#BDBDBD" />
                  </g>
                ))}

                {/* Image Placeholder */}
                <rect width="760" height="160" x="280" y="600" rx="4" fill="#F5F5F5" />
                <path d="M540,650 L580,690 L610,660 L680,730" stroke="#BDBDBD" strokeWidth="2" fill="none" />
                <circle cx="330" cy="630" r="20" fill="#E0E0E0" />

                {/* Tags */}
                <rect width="80" height="24" x="280" y="780" rx="12" fill="#EEEEEE" stroke="#E0E0E0" strokeWidth="1" />
                <rect width="100" height="24" x="370" y="780" rx="12" fill="#EEEEEE" stroke="#E0E0E0" strokeWidth="1" />
                <rect width="70" height="24" x="480" y="780" rx="12" fill="#EEEEEE" stroke="#E0E0E0" strokeWidth="1" />

                {/* AI Assistant Button */}
                <rect width="140" height="40" x="1020" y="760" rx="20" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
                <circle cx="1040" cy="780" r="10" fill="#9E9E9E" />
                <rect width="80" height="6" x="1060" y="777" rx="3" fill="#9E9E9E" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto py-24 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold">Create and organize your notes.</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Write down your thoughts, ideas, or important information with our intuitive interface and powerful organization tools.
              </p>
              <Button variant="link" className="text-black dark:text-white pl-0">
                <Link href="/notes" className="flex items-center">
                  Explore note-taking features
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </Button>

              <div className="space-y-4">
                {[
                  {
                    title: "Rich text editing",
                    description: "Format your notes with an enhanced editing experience."
                  },
                  {
                    title: "Tag-based organization",
                    description: "Categorize notes with tags for better organization and search."
                  },
                  {
                    title: "CRUD operations",
                    description: "Create, read, update, and delete notes with an intuitive interface."
                  }
                ].map((feature, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-semibold text-lg flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-black dark:bg-white rounded-full mr-2"></span>
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 pl-4">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-white dark:bg-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 320 240" fill="none" preserveAspectRatio="xMidYMid meet">
                  {/* Main Dashboard Container */}
                  <rect width="290" height="210" x="15" y="15" rx="16" fill="#FFFFFF" stroke="#666666" strokeWidth="1.5" />
                  
                  {/* Top Navigation Bar */}
                  <rect width="290" height="36" x="15" y="15" rx="16 16 0 0" fill="#F5F5F5" stroke="#666666" strokeWidth="1" />
                  
                  {/* App Logo */}
                  <rect width="26" height="20" x="22" y="23" rx="4" fill="#666666" />
                  <rect width="14" height="2" x="26" y="28" rx="1" fill="#FFFFFF" />
                  <rect width="10" height="2" x="26" y="32" rx="1" fill="#FFFFFF" />
                  <rect width="14" height="2" x="26" y="36" rx="1" fill="#FFFFFF" />
                  
                  {/* Top Navigation Items */}
                  <rect width="40" height="4" x="60" y="31" rx="2" fill="#666666" />
                  <rect width="36" height="4" x="110" y="31" rx="2" fill="#999999" />
                  <rect width="36" height="4" x="156" y="31" rx="2" fill="#999999" />
                  
                  {/* Search Box */}
                  <rect width="90" height="22" x="205" y="22" rx="11" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
                  <circle cx="215" cy="33" r="5" fill="none" stroke="#888888" strokeWidth="1.5" />
                  <line x1="219" y1="37" x2="221" y2="39" stroke="#888888" strokeWidth="1.5" />
                  <rect width="56" height="3" x="225" y="32.5" rx="1.5" fill="#AAAAAA" />
                  
                  {/* Side Navigation */}
                  <rect width="65" height="174" x="15" y="51" fill="#F9F9F9" stroke="#EEEEEE" strokeWidth="1" />
                  
                  {/* Nav Items */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={`nav-${i}`}>
                      <rect 
                        width="55" 
                        height="24" 
                        x="20" 
                        y={61 + i * 33} 
                        rx="8" 
                        fill={i === 0 ? "#EEEEEE" : "transparent"} 
                        stroke={i === 0 ? "#DDDDDD" : "transparent"} 
                        strokeWidth="1" 
                      />
                      <rect width="16" height="16" x="25" y={65 + i * 33} rx="3" fill="#666666" opacity={i === 0 ? "1" : "0.6"} />
                      <rect width="26" height="3" x="46" y={72 + i * 33} rx="1.5" fill="#666666" opacity={i === 0 ? "1" : "0.6"} />
                    </g>
                  ))}
                  
                  {/* Main Content */}
                  <rect width="215" height="174" x="90" y="51" fill="#FFFFFF" />
                  
                  {/* Content Header */}
                  <rect width="195" height="24" x="100" y="61" rx="4" fill="#FFFFFF" />
                  <rect width="90" height="8" x="100" y="61" rx="2" fill="#666666" />
                  
                  {/* Tag Filter Bar */}
                  <rect width="195" height="28" x="100" y="95" rx="10" fill="#F5F5F5" stroke="#EEEEEE" strokeWidth="1" />
                  <text x="110" y="113" fontFamily="Arial" fontSize="9" fill="#666666">Filter by tags:</text>
                  
                  {/* Tags */}
                  <rect width="50" height="16" x="184" y="101" rx="8" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
                  <text x="196" y="112" fontFamily="Arial" fontSize="7" fill="#666666">Work</text>
                  <circle cx="234" cy="109" r="5" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
                  <line x1="232" y1="109" x2="236" y2="109" stroke="#888888" strokeWidth="1" />
                  
                  <rect width="52" height="16" x="242" y="101" rx="8" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
                  <text x="254" y="112" fontFamily="Arial" fontSize="7" fill="#666666">Personal</text>
                  <circle cx="294" cy="109" r="5" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
                  <line x1="292" y1="109" x2="296" y2="109" stroke="#888888" strokeWidth="1" />
                  
                  {/* Content Cards */}
                  {[0, 1, 2].map((i) => (
                    <g key={`card-${i}`}>
                      <rect width="195" height="34" x="100" y={135 + i * 38} rx="10" fill="#FFFFFF" stroke="#EEEEEE" strokeWidth="1" />
                      <rect width={130 - i * 18} height="4" x="110" y={144 + i * 38} rx="2" fill="#666666" />
                      <rect width={90 + i * 8} height="3" x="110" y={154 + i * 38} rx="1.5" fill="#AAAAAA" />
                      
                      {/* Card Tags */}
                      <rect 
                        width="28" 
                        height="12" 
                        x="258" 
                        y={146 + i * 38} 
                        rx="6" 
                        fill="#F9F9F9" 
                        stroke="#DDDDDD" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={272} 
                        y={154 + i * 38} 
                        fontFamily="Arial" 
                        fontSize="6" 
                        textAnchor="middle" 
                        fill="#888888"
                      >
                        {i === 0 ? "Work" : i === 1 ? "Idea" : "Task"}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Feature Section */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto py-24 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl">

              <div className="aspect-[4/3] bg-white dark:bg-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 -0 260 200" fill="none">
                  <rect width="240" height="180" x="10" y="10" rx="10" fill="#FFFFFF" stroke="#555555" strokeWidth="1.5" />

                  {/* Calendar Header */}
                  {/* <rect width="240" height="35" x="10" y="10" rx="10" fill="#F5F5F5" stroke="#555555" strokeWidth="1.5" /> */}
                  <rect width="100" height="16" x="80" y="20" ry="4" fill="#555555" />
                  <circle cx="30" cy="27" r="8" fill="#FFFFFF" stroke="#555555" strokeWidth="1.5" />
                  <circle cx="230" cy="27" r="8" fill="#FFFFFF" stroke="#555555" strokeWidth="1.5" />

                  {/* Calendar Days Header */}
                  <rect width="240" height="24" x="10" y="45" fill="#F9F9F9" stroke="#AAAAAA" strokeWidth="1"  />
                  {[0, 1, 2, 3, 4, 5, 6].map(index => (
                    <rect key={`day-header-${index}`} width="20" height="8" x={25 + index * 30} y="53" rx="4" fill="#777777" />
                  ))}

                  {/* Calendar Grid */}
                  {[0, 1, 2, 3].map(row => (
                    <g key={`row-${row}`}>
                      <line
                        x1="10"
                        y1={70 + row * 30}
                        x2="250"
                        y2={70 + row * 30}
                        stroke="#CCCCCC"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      {[0, 1, 2, 3, 4, 5, 6].map(col => (
                        <rect
                          key={`day-${row}-${col}`}
                          width="10"
                          height="10"
                          x={25 + col * 30}
                          y={75 + row * 30}
                          rx="5"
                          fill="#777777"
                        />
                      ))}
                    </g>
                  ))}

                  {/* Calendar Events */}
                  <rect width="55" height="15" x="20" y="95" rx="7.5" fill="#FFFFFF" stroke="#555555" strokeWidth="1" />
                  <rect width="55" height="15" x="80" y="95" rx="7.5" fill="#FFFFFF" stroke="#555555" strokeWidth="1" />
                  <rect width="55" height="15" x="140" y="125" rx="7.5" fill="#FFFFFF" stroke="#555555" strokeWidth="1" />

                  {/* Google Calendar Badge - Keeping Colorful */}
                  <rect width="120" height="20" x="70" y="165" rx="10" fill="#F8F8F8" stroke="#AAAAAA" strokeWidth="1" />
                  <circle cx="80" cy="175" r="5" fill="#EA4335" />
                  <circle cx="95" cy="175" r="5" fill="#4285F4" />
                  <circle cx="110" cy="175" r="5" fill="#FBBC05" />
                  <circle cx="125" cy="175" r="5" fill="#34A853" />
                  <rect width="40" height="6" x="140" y="172" rx="3" fill="#777777" />
                </svg>
              </div>
      </div>
      
            <div className="order-1 md:order-2 space-y-8">
              <h3 className="text-3xl font-bold">Google Calendar integration.</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Connect your notes to your schedule. Set reminders and organize your time efficiently with our Google Calendar integration.
              </p>
              <Button variant="link" className="text-black dark:text-white pl-0">
                <Link href="/notes" className="flex items-center">
                  Explore calendar features
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </Button>

              <div className="space-y-4">
                {[
                  {
                    title: "Schedule reminders",
                    description: "Set reminders for important notes and deadlines."
                  },
                  {
                    title: "Event integration",
                    description: "Link notes to calendar events for better context."
                  },
                  {
                    title: "Time management",
                    description: "Organize your notes and time in one place."
                  }
                ].map((feature, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-semibold text-lg flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-black dark:bg-white rounded-full mr-2"></span>
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 pl-4">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto py-24 px-4 md:px-6 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">
            Powered by Google Gemini API
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">AI-powered note summarization</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Let our AI-powered system automatically generate summaries of your longer notes, giving you the key points without the extra reading.
          </p>
          <Button variant="link" className="text-black dark:text-white">
            <Link href="/notes" className="flex items-center justify-center">
              Try AI summarization
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6" /></svg>
            </Link>
          </Button>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Automatic summaries",
                description: "Generate concise summaries of lengthy notes with one click.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className="mx-auto mb-4">
                    <rect width="46" height="40" x="2" y="5" rx="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />

                    {/* Document lines */}
                    <rect width="30" height="4" x="10" y="12" rx="2" fill="#4F46E5" />
                    <rect width="36" height="2" x="7" y="20" rx="1" fill="#94A3B8" />
                    <rect width="34" height="2" x="7" y="24" rx="1" fill="#94A3B8" />
                    <rect width="30" height="2" x="7" y="28" rx="1" fill="#94A3B8" />

                    {/* Summary indicator */}
                    <path d="M5,38 L45,38 L45,32 C45,31.4477 44.5523,31 44,31 L6,31 C5.44772,31 5,31.4477 5,32 L5,38 Z" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1" />
                    <rect width="20" height="2" x="15" y="34" rx="1" fill="#3B82F6" />

                    {/* AI sparkles */}
                    <circle cx="42" cy="10" r="2" fill="#818CF8" />
                    <circle cx="8" cy="10" r="2" fill="#818CF8" />
                    <circle cx="42" cy="38" r="2" fill="#818CF8" />
                    <circle cx="8" cy="38" r="2" fill="#818CF8" />
                  </svg>
                )
              },
              {
                title: "Key point extraction",
                description: "Identify and highlight the most important information.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className="mx-auto mb-4">
                    <rect width="46" height="40" x="2" y="5" rx="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />

                    {/* Document with highlights */}
                    <rect width="36" height="2" x="7" y="12" rx="1" fill="#94A3B8" />
                    <rect width="20" height="3" x="7" y="18" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <rect width="34" height="2" x="7" y="24" rx="1" fill="#94A3B8" />
                    <rect width="15" height="3" x="25" y="24" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <rect width="30" height="2" x="7" y="30" rx="1" fill="#94A3B8" />
                    <rect width="18" height="3" x="10" y="30" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <rect width="36" height="2" x="7" y="36" rx="1" fill="#94A3B8" />

                    {/* Magnifying glass */}
                    <circle cx="40" cy="40" r="3" fill="none" stroke="#4F46E5" strokeWidth="2" />
                    <line x1="37" y1="37" x2="34" y2="34" stroke="#4F46E5" strokeWidth="2" />
                  </svg>
                )
              },
              {
                title: "Time saver",
                description: "Quickly review long documents without reading everything.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className="mx-auto mb-4">
                    <circle cx="25" cy="25" r="20" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />

                    {/* Clock hands */}
                    <line x1="25" y1="25" x2="25" y2="15" stroke="#4F46E5" strokeWidth="2" />
                    <line x1="25" y1="25" x2="32" y2="30" stroke="#4F46E5" strokeWidth="2" />
                    <circle cx="25" cy="25" r="2" fill="#4F46E5" />

                    {/* Time indicators */}
                    <circle cx="25" cy="10" r="1" fill="#94A3B8" />
                    <circle cx="40" cy="25" r="1" fill="#94A3B8" />
                    <circle cx="25" cy="40" r="1" fill="#94A3B8" />
                    <circle cx="10" cy="25" r="1" fill="#94A3B8" />

                    {/* Speed lines */}
                    <path d="M42,15 L45,12" stroke="#4F46E5" strokeWidth="1" />
                    <path d="M42,35 L45,38" stroke="#4F46E5" strokeWidth="1" />
                    <path d="M8,15 L5,12" stroke="#4F46E5" strokeWidth="1" />
                    <path d="M8,35 L5,38" stroke="#4F46E5" strokeWidth="1" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                {feature.icon}
                <h4 className="font-semibold text-lg mb-3">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      {/* <section className="w-full">
        <div className="max-w-6xl mx-auto py-24 px-4 md:px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Common note templates to get started.</h3>
            <Button variant="link" className="text-black dark:text-white">
              <Link href="/notes" className="flex items-center justify-center">
                Explore all templates 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
        </Button>
      </div>
      
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Daily Journal",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                    <rect width="30" height="35" x="5" y="2.5" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="20" height="4" x="10" y="7" rx="1" fill="#4F46E5" />
                    <line x1="10" y1="15" x2="30" y2="15" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="15" height="2" x="10" y="18" rx="1" fill="#9CA3AF" />
                    <rect width="12" height="2" x="10" y="22" rx="1" fill="#9CA3AF" />
                    <rect width="18" height="2" x="10" y="26" rx="1" fill="#9CA3AF" />
                    <path d="M10,32 L17,32 M10,32 L10,33 L17,33 L17,32" stroke="#9CA3AF" strokeWidth="1" />
                  </svg>
                )
              },
              {
                name: "Meeting Notes",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                    <rect width="30" height="35" x="5" y="2.5" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="20" height="4" x="10" y="7" rx="1" fill="#4F46E5" />
                    <circle cx="13" cy="18" r="2" fill="#9CA3AF" />
                    <rect width="12" height="2" x="18" y="17" rx="1" fill="#9CA3AF" />
                    <circle cx="13" cy="23" r="2" fill="#9CA3AF" />
                    <rect width="12" height="2" x="18" y="22" rx="1" fill="#9CA3AF" />
                    <circle cx="13" cy="28" r="2" fill="#9CA3AF" />
                    <rect width="12" height="2" x="18" y="27" rx="1" fill="#9CA3AF" />
                  </svg>
                )
              },
              {
                name: "Project Planning",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                    <rect width="30" height="35" x="5" y="2.5" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="20" height="4" x="10" y="7" rx="1" fill="#4F46E5" />
                    <rect width="24" height="3" x="8" y="16" rx="1" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
                    <rect width="18" height="3" x="11" y="22" rx="1" fill="#ECFCCB" stroke="#A3E635" strokeWidth="1" />
                    <rect width="12" height="3" x="14" y="28" rx="1" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
                    <line x1="10" y1="16" x2="10" y2="31" stroke="#9CA3AF" strokeWidth="1" />
                    <circle cx="10" cy="16" r="1" fill="#9CA3AF" />
                    <circle cx="10" cy="22" r="1" fill="#9CA3AF" />
                    <circle cx="10" cy="28" r="1" fill="#9CA3AF" />
                  </svg>
                )
              },
              {
                name: "Research Notes",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                    <rect width="30" height="35" x="5" y="2.5" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="20" height="4" x="10" y="7" rx="1" fill="#4F46E5" />
                    <line x1="10" y1="15" x2="30" y2="15" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="15" height="2" x="10" y="18" rx="1" fill="#9CA3AF" />
                    <rect width="18" height="2" x="10" y="22" rx="1" fill="#9CA3AF" />
                    <circle cx="28" cy="30" r="6" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
                    <line x1="24" y1="26" x2="19" y2="21" stroke="#9CA3AF" strokeWidth="1.5" />
                  </svg>
                )
              },
              {
                name: "Reading List",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                    <rect width="25" height="30" x="5" y="5" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="25" height="30" x="10" y="5" rx="2" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="11" height="2" x="17" y="10" rx="1" fill="#4F46E5" />
                    <rect width="15" height="2" x="15" y="15" rx="1" fill="#9CA3AF" />
                    <rect width="12" height="2" x="16.5" y="19" rx="1" fill="#9CA3AF" />
                    <rect width="14" height="2" x="15.5" y="23" rx="1" fill="#9CA3AF" />
                    <rect width="10" height="2" x="17.5" y="27" rx="1" fill="#9CA3AF" />
                    <path d="M10,10 L10,30 C10,30 12,28 15,28 C18,28 20,30 20,30 C20,30 22,28 25,28 C28,28 30,30 30,30 L30,10" stroke="#9CA3AF" strokeWidth="0.5" fill="none" />
                  </svg>
                )
              },
              {
                name: "Study Notes",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                    <rect width="30" height="35" x="5" y="2.5" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <rect width="20" height="4" x="10" y="7" rx="1" fill="#4F46E5" />
                    <line x1="10" y1="15" x2="30" y2="15" stroke="#9CA3AF" strokeWidth="1" />
                    <circle cx="12.5" cy="19" r="1.5" fill="#9CA3AF" />
                    <rect width="14" height="2" x="16" y="18" rx="1" fill="#9CA3AF" />
                    <circle cx="12.5" cy="23" r="1.5" fill="#9CA3AF" />
                    <rect width="14" height="2" x="16" y="22" rx="1" fill="#9CA3AF" />
                    <circle cx="12.5" cy="27" r="1.5" fill="#9CA3AF" />
                    <rect width="14" height="2" x="16" y="26" rx="1" fill="#9CA3AF" />
                    <rect width="18" height="3" x="11" y="31" rx="1.5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="0.5" />
                  </svg>
                )
              }
            ].map((template, index) => (
              <a key={index} href="#" className="group">
                <div className="aspect-[3/2] bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
                  {template.icon}
                </div>
                <p className="font-medium group-hover:underline">{template.name} →</p>
              </a>
            ))}
          </div>
      </div>
      </section> */}
    </div>
  );
}
