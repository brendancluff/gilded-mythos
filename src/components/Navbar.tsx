
"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Podcasts", href: "/podcasts" },
  { name: "Characters", href: "/characters" },
  { name: "Alori Lore", href: "/lore" },
  { name: "House Quiz", href: "/quiz" },
  { name: "Community", href: "/community" },
  { name: "News", href: "/news" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link
          href="/"
          className="brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-symbol">✦</span>
          Gilded Mythos
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div
          id="main-menu"
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="login-button"
            onClick={() => setMenuOpen(false)}
          >
            Login / Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
