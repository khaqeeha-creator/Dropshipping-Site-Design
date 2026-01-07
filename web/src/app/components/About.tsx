import { Heart, Shield, Truck } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Heart,
    title: "Quality Care",
    description: "Every product is carefully tested to ensure it meets our high standards of quality and effectiveness",
    color: "from-pink-500 to-rose-500",
    darkColor: "dark:from-pink-400 dark:to-rose-400"
  },
  {
    icon: Shield,
    title: "Safe & Trusted",
    description: "We prioritize safety and reliability, giving you peace of mind when caring for your family",
    color: "from-blue-500 to-cyan-500",
    darkColor: "dark:from-blue-400 dark:to-cyan-400"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping so you can start caring for your loved ones without delay",
    color: "from-purple-500 to-indigo-500",
    darkColor: "dark:from-purple-400 dark:to-indigo-400"
  }
];

export function About() {
  return (
    <section id="aboutus" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />
        
        {/* Translucent Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1761798983107-a48299f8fb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGFzdGVsJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njc2OTEzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt=""
            className="w-full h-full object-cover mix-blend-soft-light dark:mix-blend-overlay"
          />
        </motion.div>

        {/* Animated Orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 mix-blend-overlay z-10" />
              <img
                src="https://images.unsplash.com/photo-1766808985877-bc04db0dbe68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjYXJlZ2l2aW5nJTIwZWxkZXJseXxlbnwxfHx8fDE3Njc2OTA5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Family caring for elderly loved one"
                className="rounded-3xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 md:order-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <span className="text-6xl">💝</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              At wCare, we understand the deep bond between family members and the desire to provide the best care for your loved ones.
            </p>
            
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
              Our wellness products are carefully chosen to bring comfort, relief, and peace of mind to families everywhere. Every product we offer is selected with love and care, thinking of the precious moments you share with those who matter most.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-4 border-white dark:border-gray-900 flex items-center justify-center text-white"
                    >
                      {i === 1 && "👨"}
                      {i === 2 && "👩"}
                      {i === 3 && "👴"}
                      {i === 4 && "👵"}
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">Trusted by families worldwide</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl text-center space-y-4 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className={`absolute inset-0 bg-gradient-to-br ${value.color} ${value.darkColor}`}
              />

              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} ${value.darkColor} rounded-2xl shadow-lg`}
              >
                <value.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="relative text-2xl text-gray-900 dark:text-white">
                {value.title}
              </h3>

              <p className="relative text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {value.description}
              </p>

              {/* Shimmer Effect */}
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none"
                style={{ transform: "skewX(-20deg)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
