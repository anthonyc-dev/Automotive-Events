"use client";

import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Trophy } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "500+",
    label: "Events This Year",
    description: "From rallies to exhibitions",
  },
  {
    icon: Users,
    value: "50k+",
    label: "Active Users",
    description: "Car enthusiasts worldwide",
  },
  {
    icon: MapPin,
    value: "25+",
    label: "Countries",
    description: "Global automotive community",
  },
  {
    icon: Trophy,
    value: "100+",
    label: "Competitions",
    description: "Racing events and contests",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connecting the Automotive Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of car enthusiasts who trust AutoEvents to discover
            and share amazing automotive experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
