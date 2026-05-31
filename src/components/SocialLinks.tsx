/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

interface SocialPlatform {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
  username: string;
  colorClass: string;
}

export default function SocialLinks() {
  const platforms: SocialPlatform[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/mtahamashkoor57',
      icon: Github,
      username: '@mtahamashkoor57',
      colorClass: 'hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-950/10'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mtahamashkoor57',
      icon: Linkedin,
      username: 'M Taha',
      colorClass: 'hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-950/10'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/taha_webdev',
      icon: Twitter,
      username: '@taha_webdev',
      colorClass: 'hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-950/10'
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center" id="social-links-container">
      {platforms.map((platform) => {
        const IconComponent = platform.icon;
        return (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-450 text-zinc-400 transition-all duration-350 ease-out cursor-pointer text-xs ${platform.colorClass}`}
            title={`Visit M Taha's ${platform.name} profile`}
          >
            <IconComponent className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-zinc-200 group-hover:text-white text-[11px] leading-tight transition-colors">
                {platform.name}
              </span>
              <span className="text-[9px] text-zinc-550 text-zinc-500 font-mono group-hover:text-zinc-350 leading-none">
                {platform.username}
              </span>
            </div>
            <ArrowUpRight className="h-3 w-3 text-zinc-650 text-zinc-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
        );
      })}
    </div>
  );
}
