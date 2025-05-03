
// Data based on WEF Future of Jobs Report 2025
export const futureSkills = [
  {
    category: "Cognitive",
    skills: [
      "Analytical thinking",
      "Creative thinking",
      "Critical thinking",
      "Complex problem-solving",
      "Systems thinking",
    ]
  },
  {
    category: "Interpersonal",
    skills: [
      "Empathy",
      "Active listening",
      "Communication",
      "Leadership",
      "Social influence",
      "Emotional intelligence"
    ]
  },
  {
    category: "Self-Leadership",
    skills: [
      "Adaptability",
      "Resilience",
      "Curiosity",
      "Lifelong learning",
      "Self-awareness"
    ]
  },
  {
    category: "Digital & Technological",
    skills: [
      "Digital literacy",
      "Technological fluency",
      "Data literacy",
      "Computational thinking",
      "AI & automation understanding"
    ]
  }
];

export const recommendedActivities = [
  {
    id: 1,
    title: "Young Medical Explorers Workshop",
    description: "A hands-on workshop where children learn the basics of medical science through interactive activities and experiments.",
    type: "Workshop",
    location: "City Science Center",
    date: "June 15-16, 2025",
    skills: ["Medical Knowledge", "Critical Thinking", "Curiosity"],
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  {
    id: 2,
    title: "Theatre Arts for Young Performers",
    description: "An 8-week program introducing children to acting, stage presence, and storytelling through theatre.",
    type: "Course",
    location: "Community Arts Center",
    date: "Starting July 5, 2025",
    skills: ["Creativity", "Communication", "Empathy"],
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
  },
  {
    id: 3,
    title: "Children's Leadership Camp",
    description: "A summer camp focused on developing leadership skills, teamwork, and confidence in young children.",
    type: "Camp",
    location: "Woodland Nature Park",
    date: "August 10-14, 2025",
    skills: ["Leadership", "Social Influence", "Communication"],
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
  },
  {
    id: 4,
    title: "City Children's Hospital Tour",
    description: "Educational tour of the hospital with interactive learning stations about healthcare professions.",
    type: "Field Trip",
    location: "City Children's Hospital",
    date: "May 22, 2025",
    skills: ["Medical Knowledge", "Curiosity"],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: 5,
    title: "Creative Problem-Solving Club",
    description: "Weekly club that presents children with real-world problems and guides them through creative solution processes.",
    type: "Club",
    location: "Central Library",
    date: "Every Saturday",
    skills: ["Creative Thinking", "Problem-Solving", "Critical Thinking"],
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  }
];

export const sampleLearningPath = [
  {
    id: 1,
    title: "Initial Assessment & Goal Setting",
    type: "Milestone",
    description: "Comprehensive evaluation of Emma's interests, strengths, and areas for development. Set clear goals for her future in medicine and theatre.",
    date: "May 2025",
    completed: true,
    skillArea: "Planning"
  },
  {
    id: 2,
    title: "Children's Hospital Tour",
    type: "Field Trip",
    description: "Educational visit to City Children's Hospital to learn about different medical roles and hospital departments.",
    date: "May 22, 2025",
    completed: true,
    skillArea: "Medical Knowledge"
  },
  {
    id: 3,
    title: "Theatre Arts Program",
    type: "Course",
    description: "8-week introductory theatre program focusing on stage presence, voice projection, and storytelling.",
    date: "July-August 2025",
    completed: false,
    skillArea: "Performance Skills"
  },
  {
    id: 4,
    title: "Young Leaders Summer Camp",
    type: "Camp",
    description: "Week-long camp developing teamwork, communication, and leadership abilities through group activities.",
    date: "August 2025",
    completed: false,
    skillArea: "Leadership"
  },
  {
    id: 5,
    title: "Science Club Enrollment",
    type: "Regular Activity",
    description: "Join the after-school science club focusing on biology and human body systems through interactive experiments.",
    date: "September 2025",
    completed: false,
    skillArea: "Scientific Knowledge"
  },
  {
    id: 6,
    title: "Public Speaking Workshop",
    type: "Workshop",
    description: "Weekend workshop helping children develop confidence in expressing ideas clearly to audiences.",
    date: "October 2025",
    completed: false,
    skillArea: "Communication"
  },
  {
    id: 7,
    title: "Winter Theatre Production",
    type: "Performance",
    description: "Participation in seasonal play to apply theatre skills in a supportive environment.",
    date: "December 2025",
    completed: false,
    skillArea: "Performance Skills"
  },
  {
    id: 8,
    title: "First Aid for Kids Course",
    type: "Course",
    description: "Age-appropriate first aid training introducing medical concepts and developing helping skills.",
    date: "January 2026",
    completed: false,
    skillArea: "Medical Skills"
  }
];
