import React from 'react';
import { useCMS } from '../context/CMSContext';
import { FooterLogo, InstagramIcon, LinkedinIcon, BehanceIcon } from './BrandLogo';
import { Mail } from 'lucide-react';

interface FooterProps {
  theme?: 'dark-on-light' | 'light-on-dark';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'light-on-dark' }) => {
  const { data, setActivePage } = useCMS();
  const { socials } = data.connect;

  const isLight = theme === 'light-on-dark';

  return (
    <footer
      id="main-page-footer"
      className="w-full h-[80px] md:h-[100px] flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] z-30 relative max-w-[2100px] mx-auto select-none"
    >
      {/* Icon logo on the left: jt. */}
      <div className="flex items-center">
        <FooterLogo
          variant={isLight ? 'light' : 'dark'}
          onClick={() => setActivePage('home')}
        />
      </div>

      {/* Social media icons on the right */}
      <div
        id="footer-social-links"
        className="flex items-center space-x-6 sm:space-x-8"
      >
        <a
          id="social-link-instagram"
          href={socials.instagram || 'https://instagram.com'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
          className={`group flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
            isLight
              ? 'text-white/90 hover:text-[#7ACAD2]'
              : 'text-[#333333] hover:text-[#7ACAD2]'
          }`}
        >
          <InstagramIcon className="h-[18px] sm:h-[19px] w-auto shrink-0" />
        </a>

        <a
          id="social-link-linkedin"
          href={socials.linkedin || 'https://linkedin.com'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className={`group flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
            isLight
              ? 'text-white/90 hover:text-[#7ACAD2]'
              : 'text-[#333333] hover:text-[#7ACAD2]'
          }`}
        >
          <LinkedinIcon className="h-[18px] sm:h-[19px] w-auto shrink-0" />
        </a>

        <a
          id="social-link-behance"
          href={socials.behance || 'https://behance.net'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance Profile"
          className={`group flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
            isLight
              ? 'text-white/90 hover:text-[#7ACAD2]'
              : 'text-[#333333] hover:text-[#7ACAD2]'
          }`}
        >
          <BehanceIcon className="h-[18px] sm:h-[19px] w-auto shrink-0" />
        </a>

        {socials.email && (
          <a
            id="social-link-email"
            href={`mailto:${socials.email}`}
            aria-label="Send Email"
            className={`hidden sm:flex items-center justify-center group transition-all duration-200 transform hover:scale-110 ${
              isLight
                ? 'text-white/90 hover:text-[#7ACAD2]'
                : 'text-[#333333] hover:text-[#7ACAD2]'
            }`}
          >
            <Mail className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
          </a>
        )}
      </div>
    </footer>
  );
};
