export default function GoldLeafDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-vento-gold/70" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-vento-gold">
        <path
          d="M12 3c2.8 3.2 6.5 7.2 6.5 11.2A6.5 6.5 0 0 1 12 20.7 6.5 6.5 0 0 1 5.5 14.2C5.5 10.2 9.2 6.2 12 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M12 8v12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="h-px flex-1 bg-vento-gold/70" />
    </div>
  )
}
