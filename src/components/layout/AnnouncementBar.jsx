export default function AnnouncementBar() {
  const announcements = [
    "✨ FREE SHIPPING ON ORDERS OVER ₹999",
    "🌿 15% OFF YOUR FIRST ORDER - USE CODE: NEWUSER15",
    "🚚 NEXT DAY DELIVERY IN METROS",
  ];
  
  // Duplicate for seamless infinite scrolling
  const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-vento-forest text-vento-gold py-2 overflow-hidden flex whitespace-nowrap text-xs md:text-sm font-semibold tracking-wider uppercase relative z-50">
      <div className="animate-marquee flex">
        {duplicatedAnnouncements.map((text, idx) => (
          <div key={idx} className="flex items-center mx-6">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
