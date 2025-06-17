
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Vibe Tribe
            </span>
            <br />
            <span className="text-white">Code Your Style</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Premium vibe coding gear from Lockin-Labs - for developers who live in the flow state.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Shop Lockin-Labs Gear
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 text-lg"
            >
              Join the Tribe
            </Button>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-cyan-500/20">
            <div className="font-mono text-sm text-left">
              <div className="text-gray-500 mb-2">// Vibe Tribe essentials</div>
              <div className="text-cyan-400">const <span className="text-white">vibeCoders</span> = {`{`}</div>
              <div className="ml-4 text-white">energy: <span className="text-green-400">'infinite'</span>,</div>
              <div className="ml-4 text-white">style: <span className="text-green-400">'unmatched'</span>,</div>
              <div className="ml-4 text-white">tribe: <span className="text-green-400">'united'</span></div>
              <div className="text-cyan-400">{`};`}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
