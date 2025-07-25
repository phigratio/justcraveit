"use client"

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, MapPin, Clock, Phone, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

const flavors = [
  {
    name: "Ultimate Swirl",
    image: "/images/ultimate-swirl.jpg",
    popular: true,
    description: "A perfect harmony of chocolate and vanilla",
  },
  {
    name: "Classic Vanilla",
    image: "/images/classic-vanilla.jpg",
    popular: true,
    description: "Pure, creamy vanilla perfection",
  },
  {
    name: "Chocolate Heaven",
    image: "/images/chocolate-heaven.jpg",
    popular: true,
    description: "Rich, decadent chocolate indulgence",
  },
  {
    name: "Mango Twist",
    image: "/images/mango-twist.jpg",
    popular: false,
    description: "Tropical mango with a delightful twist",
  },
  {
    name: "Strawberry Madness",
    image: "/images/strawberry-madness.jpg",
    popular: true,
    description: "Fresh strawberry bliss in every swirl",
  },
  {
    name: "Tropical Berry Açai",
    image: "/images/tropical-berry.jpg",
    popular: false,
    description: "Exotic açai with tropical berry notes",
  },
  {
    name: "Pistachio Madness",
    image: "/images/pistachio-madness.jpg",
    popular: false,
    description: "Luxurious pistachio with nutty richness",
  },
]

const cupSizes = [
  { size: "Small Cup", price: "$4.99", description: "Perfect for a light treat" },
  { size: "Medium Cup", price: "$6.99", description: "Our most popular size" },
  { size: "Large Cup", price: "$9.99", description: "For the true froyo lover" },
  { size: "Jumbo Cup", price: "$15.99", description: "Share or indulge completely" },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])
  const mascotY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })
      mouseX.set(clientX)
      mouseY.set(clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-white overflow-hidden relative"
    >
      {/* Floating Mascot Elements */}
      <motion.div
        className="fixed top-20 right-10 w-16 h-16 opacity-10 pointer-events-none z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <Image src="/images/mascot.webp" alt="Floating Mascot" fill className="object-contain" />
      </motion.div>

      <motion.div
        className="fixed bottom-20 left-10 w-12 h-12 opacity-10 pointer-events-none z-10"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Image src="/images/mascot.webp" alt="Floating Mascot" fill className="object-contain" />
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mouseXSpring,
          top: mouseYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-full h-full bg-pink-500 rounded-full opacity-50" />
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-8 md:p-12 bg-white/90 backdrop-blur-xl border-b border-pink-100/50"
      >
        <motion.div className="flex items-center gap-4">
          <motion.div
            className="w-10 h-10 relative"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image src="/images/mascot.webp" alt="Just Crave It Logo" fill className="object-contain" />
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl font-display tracking-wider bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent"
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            Just Crave It
          </motion.h1>
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-lg md:text-xl font-display text-gray-700 cursor-pointer group"
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5 group-hover:text-pink-600 transition-colors" />
          </motion.div>
          <span className="group-hover:text-pink-600 transition-colors">Info</span>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        style={{ y: textY }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 pt-24"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-3 h-3 bg-rose-300 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <motion.div
          style={{ y: mascotY }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="mb-16 relative"
        >
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Mascot Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/30 to-pink-400/20 blur-3xl rounded-full scale-150"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.4, 1.6, 1.4],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
              }}
            />

            <motion.div
              animate={{
                rotate: [0, 3, -3, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <Image
                src="/images/mascot.webp"
                alt="Just Crave It Mascot"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Floating Hearts */}
            <motion.div
              className="absolute -top-4 -right-4 text-pink-400"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-light mb-8 text-gray-800 leading-tight"
          >
            Australia's First
          </motion.h2>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-light mb-12 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent leading-tight"
          >
            Self‑Serve Froyo Experience
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-body font-light"
          >
            Pay by the cup, not by weight. Create your perfect frozen yogurt with nine delicious flavours and
            thirty‑plus toppings.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
              <Button className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white px-12 py-4 text-lg font-display font-medium rounded-none shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Explore Flavours</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
              <Button
                variant="outline"
                className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 px-12 py-4 text-lg font-display font-medium rounded-none bg-transparent relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-50/0 via-pink-50/50 to-pink-50/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Visit Us</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Hero Image Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="py-24 px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-[60vh] md:h-[70vh] rounded-none overflow-hidden shadow-2xl group"
          >
            <Image
              src="/images/hero-display.jpg"
              alt="Just Crave It Frozen Yogurt Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
            />

            {/* Floating Mascot in Image */}
            <motion.div
              className="absolute bottom-8 right-8 w-20 h-20 opacity-80"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <Image src="/images/mascot.webp" alt="Mascot" fill className="object-contain drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Flavours Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 px-8 relative"
      >
        {/* Section Mascot */}
        <motion.div
          className="absolute top-10 left-10 w-16 h-16 opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "linear",
          }}
        >
          <Image src="/images/mascot.webp" alt="Section Mascot" fill className="object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-gray-800 mb-6">Flavours</h2>
          <p className="text-xl text-gray-600 font-body font-light max-w-2xl mx-auto">
            Each flavour crafted with care, served with endless possibilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.name}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -20,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredFlavor(flavor.name)}
              onHoverEnd={() => setHoveredFlavor(null)}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-none relative">
                <div className="aspect-square relative overflow-hidden">
                  <AnimatePresence>
                    {flavor.popular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 text-sm font-display font-medium z-10 shadow-lg"
                      >
                        Popular
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    <Image src={flavor.image || "/placeholder.svg"} alt={flavor.name} fill className="object-cover" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredFlavor === flavor.name ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6"
                  >
                    <p className="text-white text-sm font-body font-light">{flavor.description}</p>
                  </motion.div>

                  {/* Mini Mascot on Hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: hoveredFlavor === flavor.name ? 0.8 : 0,
                      scale: hoveredFlavor === flavor.name ? 1 : 0,
                    }}
                    className="absolute top-4 left-4 w-8 h-8"
                  >
                    <Image src="/images/mascot.webp" alt="Mini Mascot" fill className="object-contain" />
                  </motion.div>
                </div>

                <CardContent className="p-8 text-center">
                  <motion.h3
                    className="text-2xl font-display font-light text-gray-800 tracking-wide"
                    animate={{
                      color: hoveredFlavor === flavor.name ? "#ec4899" : "#1f2937",
                    }}
                  >
                    {flavor.name}
                  </motion.h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Hero Collection Image */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="py-24 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[60vh] md:h-[70vh] rounded-none overflow-hidden shadow-2xl group"
          >
            <Image
              src="/images/hero-collection.jpg"
              alt="Just Crave It Frozen Yogurt Variety"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 px-8 bg-gradient-to-r from-pink-50/50 to-rose-50/50 relative"
      >
        {/* Background Mascot */}
        <motion.div
          className="absolute top-1/2 right-10 w-32 h-32 opacity-5"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <Image src="/images/mascot.webp" alt="Background Mascot" fill className="object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-gray-800 mb-6">Pricing</h2>
          <p className="text-xl text-gray-600 font-body font-light max-w-2xl mx-auto">
            Simple, transparent pricing. Pay by the cup, not by weight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {cupSizes.map((cup, index) => (
            <motion.div
              key={cup.size}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <Card className="text-center p-8 border-0 shadow-lg bg-white hover:shadow-2xl transition-all duration-500 rounded-none group relative overflow-hidden">
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 opacity-20"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 10,
                    ease: "linear",
                  }}
                >
                  <Image src="/images/mascot.webp" alt="Price Mascot" fill className="object-contain" />
                </motion.div>
                <CardContent className="p-0">
                  <motion.h3 className="text-2xl font-display font-light mb-4 text-gray-800 group-hover:text-pink-600 transition-colors">
                    {cup.size}
                  </motion.h3>
                  <motion.p className="text-5xl font-display font-light bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
                    {cup.price}
                  </motion.p>
                  <p className="text-sm text-gray-500 font-body font-light">{cup.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Location Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 px-8"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-gray-800 mb-6">Visit Us</h2>
          <p className="text-xl text-gray-600 font-body font-light max-w-2xl mx-auto">
            Located in the heart of Carlton, Melbourne
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Card className="p-10 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-500 rounded-none relative overflow-hidden">
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 opacity-10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 15,
                  ease: "linear",
                }}
              >
                <Image src="/images/mascot.webp" alt="Contact Mascot" fill className="object-contain" />
              </motion.div>
              <CardContent className="p-0 space-y-8">
                <motion.div className="flex items-start gap-6" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                  <MapPin className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-medium text-xl text-gray-800 mb-2">Location</h3>
                    <p className="text-gray-600 font-body font-light leading-relaxed">
                      200 Elgin Street, Carlton
                      <br />
                      Melbourne, VIC 3053
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-6" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                  <Clock className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-medium text-xl text-gray-800 mb-2">Hours</h3>
                    <p className="text-gray-600 font-body font-light leading-relaxed">
                      Sunday–Thursday: 5pm – 12am
                      <br />
                      Friday–Saturday: 12pm – 2am
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-6" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                  <Phone className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-medium text-xl text-gray-800 mb-2">Phone</h3>
                    <p className="text-gray-600 font-body font-light">+61 424 424 421</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-6" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                  <Mail className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-medium text-xl text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600 font-body font-light">justcraveit.info@gmail.com</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Card className="p-10 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-500 rounded-none relative overflow-hidden">
              <motion.div
                className="absolute bottom-4 right-4 w-12 h-12 opacity-20"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <Image src="/images/mascot.webp" alt="CTA Mascot" fill className="object-contain" />
              </motion.div>
              <CardContent className="p-0">
                <h3 className="font-display font-medium text-3xl mb-6 text-gray-800">Ready to Crave?</h3>
                <p className="text-gray-600 mb-8 font-body font-light text-lg leading-relaxed">
                  Come experience Australia's first self‑serve frozen yogurt bar. Create your perfect treat today.
                </p>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
                  <Button className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white py-4 text-lg font-display font-medium rounded-none shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">Get Directions</span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-8 relative overflow-hidden">
        <motion.div
          className="absolute top-10 left-1/2 w-24 h-24 opacity-10"
          animate={{
            rotate: [0, 360],
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 12,
            ease: "easeInOut",
          }}
        >
          <Image src="/images/mascot.webp" alt="Footer Mascot" fill className="object-contain" />
        </motion.div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div
              className="w-12 h-12 relative"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image src="/images/mascot.webp" alt="Footer Logo" fill className="object-contain" />
            </motion.div>
            <h3 className="text-4xl font-display font-light bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Just Crave It
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 mb-8 font-body font-light text-lg"
          >
            Australia's first self‑serve frozen yogurt experience
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-500 text-sm font-body font-light"
          >
            © 2024 Just Crave It. All rights reserved. | 200 Elgin Street, Carlton, Melbourne, VIC 3053
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
