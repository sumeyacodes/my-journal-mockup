"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

export function BackButton() {
  return (
    <nav className="">

      <Link href="/" passHref>
        <Button>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </Link>
      
    </nav>
  );
}
