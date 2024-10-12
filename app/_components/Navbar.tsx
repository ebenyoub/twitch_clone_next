'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Ghost, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) console.log("Form submitted with :", value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <nav
      className={cn('flex flex-row p-4 w-full h-16 justify-between items-center bg-background text-foreground shadow-lg', className)}
      aria-label="Main Navigation"
    >
      <Link href={"/"} aria-label="HomePage">
        <Ghost aria-hidden="true" focusable="false" className="text-purple-500" />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-between border rounded-lg overflow-hidden max-w-xl focus-within:ring focus-within:ring-violet-500"
        role="search"
        aria-label="Search the site"
      >
        <label htmlFor="navbar_search" className="sr-only">Search</label>
        <Input
          id="navbar_search"
          className={cn('grow max-w-xl text-background w-auto rounded-r-none border-none')}
          onChange={handleChange}
          tabIndex={0}
          placeholder="Rechercher"
          aria-label="search"
          ref={inputRef}
        />
        <Button
          className={cn('rounded-l-none')}
          value={value}
          variant={"secondary"}
          type="submit"
          tabIndex={-1}
          aria-label="submit search"
        >
          <Search aria-hidden="true" focusable="false" />
        </Button>
      </form>
      <Button
        variant={"secondary"}
        tabIndex={0}
        aria-label="login"
        className={cn("focus:outline-none focus-visible:ring focus-visible:ring-violet-300")}
      >
        Login
      </Button>
    </nav>
  );
};

export default Navbar;
