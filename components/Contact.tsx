import React from 'react';
import { Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Ready to accelerate?</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Join the waiting list for our Enterprise API or schedule a demo with our solutions engineering team.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-primary-500" />
                <span>101 Cybernetics Blvd, Neo Tokyo, JP</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-primary-500" />
                <span>contact@zyphora.media</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={20} className="text-primary-500" />
                <span>+1 (800) 555-0199</span>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="First Name" 
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
            <input 
              type="email" 
              placeholder="Work Email" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <textarea 
              rows={4} 
              placeholder="Tell us about your project..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
            ></textarea>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2024 Zyphora Media. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;