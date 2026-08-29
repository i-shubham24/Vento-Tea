export default function PageBanner({ title, subtitle, imagePath }) {
  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden mb-12 shadow-md">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${imagePath || '/brand/media_1787991645006.jpg'}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-vento-forest/90 via-vento-forest/60 to-black/30"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-center px-4 pt-32 w-full">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">{title}</h1>
          {subtitle && (
            <p className="text-gray-100 max-w-xl text-base md:text-lg font-medium leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
