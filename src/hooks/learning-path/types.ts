
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

export interface ObservationData {
  content: string;
  created_at: string;
}

export interface ChildProfile {
  id: string;
  interests: string[];
  [key: string]: any;
}
