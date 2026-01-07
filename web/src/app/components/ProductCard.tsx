import { ShoppingCart, Star } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating?: number;
}

export function ProductCard({ id, name, description, price, image, rating = 5 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''));
    addItem({
      id,
      name,
      price: isNaN(priceNum) ? 0 : priceNum,
      image
    });
    toast.success(`Added ${name} to cart`);
  };

  // 3D Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 perspective-1000"
    >
      {/* Gradient Overlay on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 z-0"
      />

      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-700" style={{ transform: "translateZ(20px)" }}>
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6"
        >
          <motion.button
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-2 rounded-lg shadow-lg font-medium"
          >
            Quick View
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="relative z-10 p-6 space-y-4" style={{ transform: "translateZ(30px)" }}>
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </motion.div>
          ))}
          <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">({rating}.0)</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed min-h-[4rem]">
          {description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {price}
          </span>
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/20 curser-pointer active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-20"
        style={{ transform: "skewX(-20deg) translateZ(50px)" }}
      />
    </motion.div>
  );
}
