"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Calendar,
  Clock,
  History,
  Plus,
  User,
  LogOut,
  Zap,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Events Today", href: "/events/today", icon: Calendar },
    { name: "Upcoming Events", href: "/events", icon: Clock },
    { name: "Past Events", href: "/events/past", icon: History },
    ...(session ? [{ name: "Dashboard", href: "/dashboard", icon: Plus }] : []),
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 lg",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-none border-none shadow-none"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Enhanced Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-red-600 to-primary text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-red-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              AutoEvents
            </span>
            <span className="text-xs text-muted-foreground -mt-1">
              Discover • Connect • Drive
            </span>
          </div>
        </Link>

        {/* Enhanced Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-1">
            {navigation.map((item) => {
              // const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-muted/50 group",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* <Icon
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isActive ? "text-primary" : "group-hover:text-primary"
                    )}
                  /> */}
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Enhanced Auth Section */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex items-center space-x-2 px-4 py-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 border border-border/50 hover:border-border group"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                      {session.user?.name?.charAt(0) ||
                        session.user?.email?.charAt(0) ||
                        "U"}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {session.user?.name?.split(" ")[0] ||
                        session.user?.email?.split("@")[0]}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-300",
                      isUserMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-background/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-xl py-2"
                    >
                      <div className="px-4 py-3 border-b border-border/50">
                        <p className="text-sm font-medium text-foreground">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-muted/30"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary to-red-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" /> */}
                  <div className="relative flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Get Started</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile menu button */}
        <button
          className="md:hidden relative p-2 rounded-lg hover:bg-muted/50 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="border-t border-border/50 bg-background/95 backdrop-blur-lg px-4 py-6 space-y-4">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                        isActive
                          ? "text-primary bg-primary/10 border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Enhanced Mobile Auth Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="border-t border-border/50 pt-6 mt-6"
              >
                {status === "loading" ? (
                  <div className="flex items-center justify-center space-x-2 px-4 py-3">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Loading...
                    </span>
                  </div>
                ) : session ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
                        {session.user?.name?.charAt(0) ||
                          session.user?.email?.charAt(0) ||
                          "U"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-300 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block text-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 rounded-lg transition-all duration-300 shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span>Get Started</span>
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
