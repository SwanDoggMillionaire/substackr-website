export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-gray-900">Substackr</span>
          <span className="w-1 h-1 rounded-full bg-brand-orange" />
          <span className="text-sm text-gray-500">AI-powered writer research</span>
        </div>
        <p className="text-sm text-gray-400">
          Built by{' '}
          <a
            href="https://substack.com/@liamswan"
            className="hover:text-brand-orange transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Swanny
          </a>{' '}
          · Not affiliated with Substack Inc.
        </p>
      </div>
    </footer>
  )
}
