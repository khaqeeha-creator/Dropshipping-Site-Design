import { motion } from "motion/react";
import { Users, ShoppingBag, Star, Activity } from "lucide-react";

const stats = [
    {
        label: "Active Users",
        value: "10k+",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
        label: "Products Sold",
        value: "50k+",
        icon: ShoppingBag,
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
        label: "Satisfaction",
        value: "99%",
        icon: Star,
        color: "text-yellow-500",
        bg: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
        label: "Daily Visits",
        value: "2.5k",
        icon: Activity,
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/30"
    }
];

export function Stats() {
    return (
        <section className="py-12 bg-white dark:bg-gray-900 overflow-hidden relative">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
