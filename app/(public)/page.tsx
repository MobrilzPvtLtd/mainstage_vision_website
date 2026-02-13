export default function HomePage() {
    return (
      <main className="min-h-screen bg-black text-white">
        
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl font-bold tracking-wide">
            MAINSTAGE VISION
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Concerts. Live Media. Exclusive Coverage.
          </p>
        </section>
  
        {/* Events Section */}
        <section className="py-20 px-10">
          <h2 className="text-3xl font-semibold mb-10">
            Latest Events
          </h2>
  
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-6 rounded-xl">
              Summer Jam 2025
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl">
              Rock Fest 2025
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl">
              EDM Night 2025
            </div>
          </div>
        </section>
  
      </main>
    );
  }
  