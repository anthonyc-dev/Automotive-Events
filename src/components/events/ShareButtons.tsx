"use client";

import { Share2, Twitter, Facebook, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-muted-foreground flex items-center">
        <Share2 className="h-4 w-4 mr-1" />
        Share:
      </span>

      {/* Native share button for mobile */}
      {typeof navigator !== "undefined" && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
        >
          Share
        </button>
      )}

      {/* Social media buttons */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
      >
        <Twitter className="h-4 w-4 mr-1" />
        Twitter
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
      >
        <Facebook className="h-4 w-4 mr-1" />
        Facebook
      </a>

      {/* Copy link button */}
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
      >
        <LinkIcon className="h-4 w-4 mr-1" />
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
