export interface ProfileSection {
  title: string
  content: string
  bullets?: string[]
}

export interface WriterProfile {
  writerName: string
  researchProfile: ProfileSection
  nicheAndTopicFocus: ProfileSection
  audienceResonance: ProfileSection
  positioning: ProfileSection
  monetisationStrategy: ProfileSection
  contentPatterns: ProfileSection
  strategicSummary: {
    title: string
    insights: string[]
  }
  generatedAt: string
}

export type ResearchState = 'idle' | 'loading' | 'success' | 'error'
