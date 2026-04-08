import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout/Header';
import { Hero, Features, FeaturedYachts, CTASection } from './components/common/Hero';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedYachts />
      <CTASection />
    </>
  );
}

function CharterPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="section-title">Luxury Charter</h1>
        <p className="text-gray-600 mb-8">Explore our exclusive collection of charter yachts</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white p-6 shadow-md">
              <div className="h-48 bg-gray-200 mb-4" />
              <h3 className="font-serif text-lg">Motor Yacht {i}</h3>
              <p className="text-gray-500 text-sm">Available for charter</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CabinCruisePage() {
  return (
    <div className="pt-20 min-h-screen bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="section-title">Cabin Cruises</h1>
        <p className="text-gray-600 mb-8">Book your cabin on exclusive cruise itineraries</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 shadow-md flex gap-6">
              <div className="w-48 h-32 bg-gray-200 flex-shrink-0" />
              <div>
                <h3 className="font-serif text-lg">Mediterranean Cruise {i}</h3>
                <p className="text-gray-500 text-sm">7 days / 7 nights</p>
                <p className="text-[#c9a227] mt-2">From €1,800/person</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalePage() {
  return (
    <div className="pt-20 min-h-screen bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="section-title">Yachts for Sale</h1>
        <p className="text-gray-600 mb-8">Curated selection of yachts available for purchase</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white p-6 shadow-md">
              <div className="h-48 bg-gray-200 mb-4" />
              <h3 className="font-serif text-lg">Yacht {i}</h3>
              <p className="text-gray-500 text-sm">Price on request</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/charter" element={<CharterPage />} />
              <Route path="/cabin-cruise" element={<CabinCruisePage />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/about" element={<div className="pt-20 py-20 text-center">About Page - Coming Soon</div>} />
              <Route path="/contact" element={<div className="pt-20 py-20 text-center">Contact Page - Coming Soon</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;