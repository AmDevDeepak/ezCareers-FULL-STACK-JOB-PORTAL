import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="#" className="flex items-center gap-2">
            <MountainIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">ezCareers</span>
          </Link>
          <p className="text-muted-foreground">
            India's No.1 Job Portal. Connecting top employers and talented
            candidates.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <nav className="grid gap-1">
            <a href="mailto:am.deepakkumarchauhan@gmail.com">Send Email</a>
            <Link href="#" className="hover:underline">
              About
            </Link>
            <Link href="#" className="hover:underline">
              Careers
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-bold">Explore</h3>
          <nav className="grid gap-1">
            <Link href="#" className="hover:underline">
              Find Jobs
            </Link>
            <Link href="#" className="hover:underline">
              Companies
            </Link>
            <Link href="#" className="hover:underline">
              Salaries
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/kumardeepakchauhan/"
              className="text-muted-foreground hover:text-primary"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>

            <a
              href="https://www.instagram.com/async.deepu/"
              className="text-muted-foreground hover:text-primary"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center text-sm text-muted-foreground">
        &copy; 2024 ezCareers.com. All rights reserved.
      </div>
    </footer>
  );
};

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Footer;
