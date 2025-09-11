"use client";

import {
  Share2,
  Twitter,
  Facebook,
  Link as LinkIcon,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
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
    <div className="flex flex-wrap items-center gap-2 bg-muted/40 border border-border/60 rounded-xl px-4 py-3 shadow-sm">
      <span className="text-sm font-semibold text-muted-foreground flex items-center mr-2">
        <Share2 className="h-4 w-4 mr-1 text-primary" />
        Share this event
      </span>

      {/* Native share button for mobile */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors border border-primary/20"
          title="Share via device"
        >
          <Smartphone className="h-4 w-4 mr-1" />
          Device
        </button>
      )}

      {/* Social media buttons */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#1da1f2] hover:bg-[#1a8cd8] rounded-lg transition-colors shadow-sm"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4 mr-1" />
        Twitter
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#1877f2] hover:bg-[#145db2] rounded-lg transition-colors shadow-sm"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4 mr-1" />
        Facebook
      </a>

      {/* Copy link button */}
      <button
        onClick={copyToClipboard}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors border ${
          copied
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-muted text-foreground hover:bg-muted/80 border-border/40"
        }`}
        title="Copy link"
      >
        {copied ? (
          <>
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4 mr-1" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
