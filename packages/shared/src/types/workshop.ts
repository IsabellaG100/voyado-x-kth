export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'done' | 'skipped';

export interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  order: number;
}

export interface TeamMember {
  name: string;
  email: string;
  github: string;
  role: string;
  initials: string;
  avatarColor: string;
}

export interface TeamModule {
  route: string;
  package: string;
  title: string;
  description: string;
}

export interface TeamProgress {
  currentStep: string;
  steps: Record<string, StepStatus>;
  branchName: string | null;
  prUrl: string | null;
  prNumber: number | null;
  deployedUrl: string | null;
  lastActivity: string | null;
}

export interface Team {
  id: string;
  name: string;
  nickname: string;
  module: TeamModule;
  members: TeamMember[];
  progress: TeamProgress;
}

export interface EventMentor {
  name: string;
  role: string;
  email: string;
  github: string;
}

export interface EventInfo {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  mentors: EventMentor[];
}

export interface WorkshopData {
  event: EventInfo;
  workflowSteps: WorkflowStep[];
  teams: Team[];
}
