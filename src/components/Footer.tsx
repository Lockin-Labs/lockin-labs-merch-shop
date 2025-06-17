
const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-gray-950 font-bold text-sm">LL</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Lockin-Labs
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Premium developer apparel for those who stay locked in and code with passion.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Hoodies</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">T-Shirts</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Stickers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Lockin-Labs. All rights reserved. Built with ❤️ by developers, for developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
