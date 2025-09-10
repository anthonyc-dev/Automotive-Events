"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Search, Zap, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop')",
        }}
      />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-10 container px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-8"
          >
            <Zap className="h-4 w-4 text-accent" />
            <span>The Ultimate Automotive Event Platform</span>
            <Star className="h-4 w-4 text-accent fill-accent" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block"
            >
              Discover the Best
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent"
            >
              Automotive Events
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block text-2xl md:text-4xl lg:text-5xl font-medium text-gray-300"
            >
              in Your Area
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with car enthusiasts, discover exciting rallies,
            exhibitions, and races. Join the largest automotive community and
            never miss an event again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link
              href="/events"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-primary to-red-600 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-1 min-w-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Search className="mr-3 h-6 w-6" />
                Browse Events
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-gray-900 bg-gradient-to-r from-accent to-yellow-400 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/25 hover:-translate-y-1 min-w-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-yellow-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Calendar className="mr-3 h-6 w-6" />
                Add Your Event
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
              500+
            </div>
            <div className="text-gray-300 font-medium">Events Listed</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
              50k+
            </div>
            <div className="text-gray-300 font-medium">Car Enthusiasts</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
              <Globe className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              25+
            </div>
            <div className="text-gray-300 font-medium">Countries</div>
          </motion.div>
        </motion.div> */}
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-4 bg-gradient-to-b from-accent to-transparent rounded-full mt-3"
            />
          </div>
          <div className="absolute -inset-2 bg-white/10 rounded-full blur-sm -z-10" />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-8 w-4 h-4 bg-accent/60 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-12 w-6 h-6 bg-primary/40 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/3 left-16 w-3 h-3 bg-blue-400/50 rounded-full blur-sm"
      />
    </section>
  );
}
