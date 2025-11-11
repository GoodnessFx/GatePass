import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t mt-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">GatePass</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              The ultimate event ticketing platform for seamless event management and ticket purchases.
            </p>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Browse Events</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Create Event</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Us</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full">
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
            <div>
              <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} GatePass. All rights reserved.
          </p>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground mr-2">Built with</p>
            <Github className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;