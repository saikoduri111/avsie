
'use client';

import React from 'react';
import { BadgePercent, Sparkles } from 'lucide-react';

export const ScrollingTopBanner = () => {
  const messagePart = "We offer discounts and provide high support for new small scale businesses!";
  
  // This is one unit of content that will be repeated.
  const contentUnit = (
    <div className="flex items-center mx-6"> {/* mx-6 provides spacing between repeated units */}
      <BadgePercent className="h-5 w-5 mr-2 flex-shrink-0 text-primary-foreground" />
      <span className="font-medium text-sm sm:text-base">{messagePart}</span>
      <Sparkles className="h-5 w-5 ml-2 flex-shrink-0 text-primary-foreground" />
    </div>
  );

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-0 overflow-hidden shadow-lg relative z-10">
      {/* This div ensures that the inline-block children stay on one line */}
      <div className="whitespace-nowrap">
        {/* This div contains all the repeated content and is animated */}
        <div className="inline-block animate-scroll-left">
          {/* Repeat the content unit for a seamless scrolling effect.
              The animation scrolls by the width of one content unit.
              If 2 units are present, translateX(-50%) scrolls one unit.
          */}
          {contentUnit}
          {contentUnit}
        </div>
      </div>
    </div>
  );
};
