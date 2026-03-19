import { RecentPost } from './substack'

export interface ProfileSection {
  title: string
  content: string
  bullets?: string[]
}

export interface WriterProfile {
  writerName: string
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW'
  dataSource?: 'live' | 'training'
  oneLiner: string
  researchProfile: ProfileSection
  nicheAndTopicFocus: ProfileSection
  audienceResonance: ProfileSection
  positioning: ProfileSection
  monetisationStrategy: ProfileSection
  contentPatterns: ProfileSection
  strategicSummary: {
    title: string
    insights: string[]  // exactly 3
    theGap: string      // territory this writer is NOT covering
  }
  similarWriters: string[]  // 2-3 names to look up next
  generatedAt: string
  isAnalysingSelf?: boolean
  aboutMeTips?: string[]    // only populated when isAnalysingSelf === true
  recentPosts?: RecentPost[] // only populated when live Substack data was fetched
}

export interface EssayIdea {
  title: string
  coreTension: string
  whyItWorksForThem: string
  howToAdaptForYou: string
}

export interface EssayIdeasResult {
  writerName: string
  userNiche: string
  userDataSource?: 'live' | 'niche' | 'none'  // how the user's context was personalised
  ideas: EssayIdea[]  // always 5
}

export type ResearchMode = 'writer' | 'self'
