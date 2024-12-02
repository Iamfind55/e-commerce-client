export default function page() {
  return (
    <div className="hidden sm:block bg-base py-4 px-0">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-start gap-1 bg-neon_pink rounded py-1 px-4">
            <p className="text-white text-xs">
              About our latest product display
            </p>
          </div>
          <div className="flex items-center justify-start gap-1 bg-neon_blue rounded py-1 px-4">
            <p className="text-white text-xs">Unique service experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
