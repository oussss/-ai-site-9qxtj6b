import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-32 py-16 text-body font-medium transition-all duration-300 rounded-none inline-block text-center cursor-pointer";
  const variants = {
    primary: "bg-primary text-accent hover:bg-[#FFED4E] active:bg-[#FFC107]",
    secondary: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-secondary"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className={`bg-secondary p-24 rounded-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary text-accent border-b border-accent/10 py-16' : 'bg-transparent text-accent py-32'}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-h5 font-bold tracking-tighter uppercase">Pixel & Co</Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-32">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-body font-medium hover:text-primary transition-colors ${location.pathname === link.path ? 'border-b-2 border-primary' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          <div className={`w-32 h-2 bg-accent mb-1 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-32 h-2 bg-accent mb-1 transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-32 h-2 bg-accent transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-full h-screen bg-secondary flex flex-col items-center justify-center gap-48 md:hidden"
            >
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="text-h4 font-bold">
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-accent text-secondary py-64">
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-64">
      <div>
        <h3 className="text-h4 font-bold mb-24 text-primary">Pixel & Co</h3>
        <p className="text-neutral-400">Ignite Your Brand's Digital Future.</p>
      </div>
      <div>
        <h4 className="text-h6 font-bold mb-16">Contact</h4>
        <p className="mb-8">hello@pixelandco.agency</p>
        <p>+1 (555) 123-4567</p>
      </div>
      <div>
        <h4 className="text-h6 font-bold mb-16">Follow Us</h4>
        <div className="flex gap-16 text-neutral-400">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Twitter</span>
        </div>
      </div>
    </div>
    <div className="container mt-64 pt-32 border-t border-neutral-800 text-center text-caption text-neutral-500">
      © {new Date().getFullYear()} Pixel & Co. All rights reserved.
    </div>
  </footer>
);

// --- PAGE SECTIONS ---

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-96 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-accent to-primary bg-[length:400%_400%] animate-gradient-bg opacity-10" />
        
        <div className="container relative z-10 grid md:grid-cols-2 gap-64 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-h1 font-bold mb-24">Ignite Your Brand's Digital Future</h1>
            <p className="text-h5 text-neutral-600 mb-48 max-w-xl">
              We craft bold branding, sleek web designs, and dynamic motion graphics that turn tech startups and e-commerce visions into unforgettable experiences. Fast, innovative, results-driven.
            </p>
            <Link to="/contact"><Button>Launch Your Project Today</Button></Link>
          </motion.div>
          <motion.div 
            style={{ y: y1 }}
            className="hidden md:block"
          >
             <img 
               src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" 
               alt="Digital Abstract" 
               className="rounded-lg shadow-2xl"
             />
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-128 bg-neutral-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-32">
            {[
              "Bold, minimalist designs that capture attention in seconds",
              "Seamless mobile-first experiences with micro-animations",
              "Data-backed results from transparent case studies",
              "Innovative tech integration for personalized user journeys"
            ].map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="text-primary text-4xl mb-16">✦</div>
                  <p className="font-medium">{prop}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief About */}
      <section className="py-128 bg-secondary">
        <div className="container grid md:grid-cols-2 gap-64 items-center">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
           >
             <img 
               src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
               alt="Team working" 
               className="rounded-lg shadow-xl"
             />
           </motion.div>
           <div>
             <h2 className="text-h2 font-bold mb-32">Who We Are</h2>
             <p className="text-body text-neutral-600 mb-32">
               At Pixel & Co, we blend modern minimalism with energetic precision to deliver premium digital solutions. Specializing in tech startups and e-commerce brands, we focus on bold typography, subtle animations, and AI-powered personalization to create sites that load lightning-fast and convert effortlessly. Your ideas deserve to stand out—let's make them unstoppable.
             </p>
             <Link to="/about"><Button variant="secondary">Learn More</Button></Link>
           </div>
        </div>
      </section>
    </PageTransition>
  );
};

const About = () => (
  <PageTransition>
    <div className="pt-128 pb-64 bg-neutral-50">
      <div className="container">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-bold mb-64 text-center"
        >
          About Us
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-64 mb-128">
          <div>
             <h2 className="text-h3 font-bold mb-24">Our Story</h2>
             <p className="text-body text-neutral-600 mb-32">
               Founded by visionary designers passionate about the digital edge, Pixel & Co started as a spark in the tech scene. We've grown into a go-to agency for startups and e-commerce brands seeking that premium edge. From bold rebrands to immersive web experiences, we've helped 50+ clients disrupt their markets with clean, confident designs that move the needle.
             </p>
          </div>
          <div>
            <h2 className="text-h3 font-bold mb-24">Our Mission</h2>
            <p className="text-body text-neutral-600">
              To transform bold ideas into premium digital realities that drive growth, engagement, and innovation for ambitious brands.
            </p>
          </div>
        </div>

        <h2 className="text-h2 font-bold mb-48 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-32">
          {[
            { title: "Innovation", desc: "Pushing boundaries with AI and animation trends" },
            { title: "Excellence", desc: "Delivering sleek, fast-loading sites every time" },
            { title: "Transparency", desc: "Showcasing real results through interactive portfolios" },
            { title: "Energy", desc: "Infusing confident, dynamic energy into every project" }
          ].map((val, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-t-4 border-primary">
                <h3 className="text-h5 font-bold mb-16">{val.title}</h3>
                <p className="text-neutral-600">{val.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </PageTransition>
);

const Services = () => {
  const services = [
    {
      title: "Bold Branding",
      description: "Elevate your tech startup or e-commerce brand with striking identities that command attention. We use bold sans-serif typography and neutral palettes with vibrant accents to create memorable logos, visual systems, and style guides tailored for digital dominance.",
      benefits: ["Stand out in crowded markets with premium, minimalist aesthetics", "Build trust and recognition through consistent, innovative visuals", "Adapt seamlessly across web, apps, and motion assets"],
      cta: "Start Your Brand Refresh",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Web Design",
      description: "Design intuitive, high-converting websites optimized for mobile-first users. Incorporating scroll-triggered animations and quick-loading elements, we build sleek platforms that showcase your products and stories with energetic precision.",
      benefits: ["Boost engagement with dynamic, AI-personalized navigation", "Drive conversions via results-driven layouts and case studies", "Ensure speed and scalability for growing e-commerce needs"],
      cta: "Build Your Site Now",
      img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Motion Graphics",
      description: "Bring your brand to life with subtle, energetic animations that enhance storytelling. From micro-interactions to full video assets, we integrate motion into your digital ecosystem for immersive experiences that captivate 25-40-year-old audiences.",
      benefits: ["Increase user retention with smooth, intuitive animations", "Highlight product features dynamically for e-commerce impact", "Align with trends like bold typography in premium motion design"],
      cta: "Animate Your Vision",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <PageTransition>
      <div className="pt-128 pb-64 bg-secondary">
        <div className="container">
          <h1 className="text-h1 font-bold mb-96 text-center">Our Services</h1>
          <div className="space-y-128">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-64 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <h2 className="text-h3 font-bold mb-24">{service.title}</h2>
                  <p className="text-body text-neutral-600 mb-32">{service.description}</p>
                  <ul className="space-y-16 mb-48">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-16">
                        <span className="text-primary font-bold">✓</span>
                        <span className="text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact"><Button>{service.cta}</Button></Link>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    src={service.img} 
                    alt={service.title} 
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "TechFlow Startup Rebrand",
      desc: "Revamped branding and web design for a SaaS platform, featuring bold typography and AI-driven personalization. Result: 40% increase in user sign-ups.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "E-Shop Motion Overhaul",
      desc: "Dynamic motion graphics and e-commerce site rebuild with scroll animations. Delivered lightning-fast loads and 25% conversion uplift.",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "InnoBrand Web Launch",
      desc: "Full-suite design for a fintech startup: minimalist layout, interactive showcases, and subtle micro-animations. Achieved 3x traffic growth in first quarter.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <PageTransition>
      <div className="pt-128 pb-64 bg-neutral-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-96">
            <h1 className="text-h1 font-bold mb-32">Our Bold Creations in Action</h1>
            <p className="text-h5 text-neutral-600">
              Explore handpicked projects where we turned innovative ideas into high-impact digital experiences. Each showcases modern minimalism, energetic animations, and measurable results for tech and e-commerce leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-48">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg mb-24">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <h3 className="text-h4 font-bold mb-16 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-neutral-600">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const Contact = () => (
  <PageTransition>
    <div className="pt-128 pb-64 bg-secondary">
      <div className="container max-w-4xl">
        <div className="text-center mb-64">
          <h1 className="text-h1 font-bold mb-32">Ready to Pixelate Your Ideas?</h1>
          <p className="text-h5 text-neutral-600">
            Let's collaborate on your next big digital leap. Share your vision, and we'll craft a custom plan with bold, innovative solutions. Expect quick responses and transparent next steps.
          </p>
        </div>

        <Card className="bg-white">
          <form className="grid gap-32" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-32">
              <div className="flex flex-col gap-8">
                <label className="font-bold">Name</label>
                <input type="text" className="p-16 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-8">
                <label className="font-bold">Email</label>
                <input type="email" className="p-16 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <label className="font-bold">Message</label>
              <textarea rows="4" className="p-16 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary transition-colors" placeholder="Tell us about your project..."></textarea>
            </div>
            <div className="text-center">
              <Button type="submit">Get Your Free Consultation</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  </PageTransition>
);

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-accent bg-secondary selection:bg-primary selection:text-accent">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode='wait'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;