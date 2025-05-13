
// Define common types for the learning path components
export interface Activity {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  completed: boolean;
  skillArea: string;
  memo?: string;
  location?: string;
  source?: string;
}

export interface Observation {
  id: number;
  content: string;
  date: string;
}
