import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSection } from './ScrollSection';
import { 
  FileText, 
  BookOpen, 
  Video, 
  ExternalLink, 
  Calendar,
  ArrowRight,
  Download,
  X
} from 'lucide-react';

// Interfaces para el blog
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
  sourceUrl: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Article' | 'Dataset' | 'Web App';
  url: string;
  category: 'Research' | 'Documentation' | 'Tutorials' | 'Data' | 'Visualization';
  size?: string;
  downloads?: number;
}

// Blog posts reales de NASA
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Things You Should Know About Planetary Defense",
    excerpt: "Descubre los aspectos clave sobre cómo la NASA protege la Tierra frente a asteroides y cometas.",
    content: "La defensa planetaria abarca la detección temprana de objetos cercanos a la Tierra (NEOs), la caracterización de sus trayectorias y el desarrollo de tecnologías capaces de mitigar posibles impactos.",
    author: "NASA Science",
    date: "2024-12-01",
    category: "Planetary Defense",
    readTime: 6,
    tags: ["Planetary Defense", "Asteroides", "NEO"],
    imageUrl: "https://images.unsplash.com/photo-1697325320142-28beaededbf3?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    sourceUrl: "https://science.nasa.gov/solar-system/10-things-you-should-know-about-planetary-defense/"
  },
  {
    id: 2,
    title: "Asteroids Overview",
    excerpt: "Los asteroides son restos rocosos que orbitan alrededor del Sol, y algunos de ellos representan un riesgo potencial para la Tierra.",
    content: "NASA estudia asteroides no solo para proteger la Tierra, sino también para comprender mejor el origen del sistema solar.",
    author: "NASA Science",
    date: "2024-11-20",
    category: "Research",
    readTime: 5,
    tags: ["Asteroids", "Solar System"],
    imageUrl: "https://images.unsplash.com/photo-1709142221279-959255832580?q=80&w=1123&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sourceUrl: "https://science.nasa.gov/solar-system/asteroids/"
  },
  {
    id: 3,
    title: "Key Hardware for NASA's Asteroid-Hunting NEO Surveyor Comes Home",
    excerpt: "El componente principal del telescopio NEO Surveyor regresa tras pruebas ambientales para su integración final.",
    content: "El NEO Surveyor es un telescopio espacial diseñado para detectar asteroides cercanos a la Tierra que podrían representar una amenaza.",
    author: "NASA / JPL",
    date: "2025-03-28",
    category: "Mission Updates",
    readTime: 3,
    tags: ["NEO Surveyor", "Hardware", "Misión"],
    imageUrl: "https://images.unsplash.com/photo-1597120081843-631bddc57076?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sourceUrl: "https://science.nasa.gov/blogs/neo-surveyor/2025/03/28/key-hardware-for-nasas-asteroid-hunting-neo-surveyor-comes-home"
  },
  {
    id: 4,
    title: "How NASA Science Data Defends Earth from Asteroids",
    excerpt: "La misión DART y otros programas de NASA muestran cómo la ciencia espacial protege nuestro planeta.",
    content: "El uso de datos científicos y misiones de impacto cinético ayudan a preparar a la humanidad frente a posibles amenazas cósmicas.",
    author: "NASA Science",
    date: "2024-10-10",
    category: "Analysis",
    readTime: 5,
    tags: ["DART", "Defensa Planetaria", "Datos"],
    imageUrl: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800&h=400&fit=crop&auto=format",
    sourceUrl: "https://science.nasa.gov/open-science/planetary-defense-asteroids/"
  }
];

// Datos mock para recursos
const resources: Resource[] = [
  {
    id: 1,
    title: "Interactive View de la NASA",
    description: "Explora en 3D los asteroides, planetas y trayectorias en tiempo real con la aplicación NASA Eyes.",
    type: "Web App",
    url: "https://eyes.nasa.gov/apps/asteroids/#/planets/earth",
    category: "Visualization"
  },
  {
    id: 2,
    title: "NASA NEO Database API Documentation",
    description: "Complete API reference for accessing Near-Earth Object data from NASA's official database.",
    type: "PDF",
    url: "https://api.nasa.gov/",
    category: "Documentation"
  },
  {
    id: 3,
    title: "Asteroid Detection Tutorial Series",
    description: "Comprehensive video tutorial covering AI-based asteroid detection techniques and implementation.",
    type: "Video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Tutorials"
  },
  {
    id: 4,
    title: "Historical Impact Events Dataset",
    description: "Curated dataset of known asteroid and comet impact events throughout Earth's history.",
    type: "Dataset",
    url: "https://data.nasa.gov/Space-Science/Fireball-And-Bolide-Reports/mc52-syum",
    category: "Data"
  },
  {
    id: 5,
    title: "Machine Learning in Space Research",
    description: "Research paper on the applications of ML algorithms in space exploration and asteroid tracking.",
    type: "Article",
    url: "https://www.nasa.gov/news/releases/2021/nasa-using-artificial-intelligence-to-search-for-life/",
    category: "Research"
  }
];

// Componente principal
export function ResourcesSection() {
  const [activeTab, setActiveTab] = useState<'blog' | 'resources'>('blog');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filtrar posts por categoría
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Filtrar recursos por categoría
  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-full h-full max-w-6xl max-h-6xl rounded-full 
                        bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 blur-3xl" />
      </div>

      <ScrollSection className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
            Knowledge Base
          </div>

          {/* Título principal */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-[0.1em] leading-tight mb-8">
            Resources
            <br />
            <span className="text-white/70">& Blog</span>
          </h2>

          {/* Descripción */}
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-loose">
            Explore our collection of research papers, technical documentation, 
            and insights from the forefront of space exploration technology.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex border border-white/20 rounded-none">
            {[
              { key: 'blog', label: 'Blog Posts' },
              { key: 'resources', label: 'Resources' }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'blog' | 'resources')}
                className={`px-8 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-white/5 text-white border-r border-white/20 last:border-r-0'
                    : 'text-white/60 hover:text-white/80 border-r border-white/20 last:border-r-0'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {activeTab === 'blog' 
            ? ['All', 'Planetary Defense', 'Research', 'Mission Updates', 'Analysis'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? 'border-white/40 text-white bg-white/5'
                      : 'border-white/20 text-white/60 hover:text-white/80 hover:border-white/30'
                  }`}
                >
                  {category}
                </button>
              ))
            : ['All', 'Visualization', 'Documentation', 'Tutorials', 'Data', 'Research'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? 'border-white/40 text-white bg-white/5'
                      : 'border-white/20 text-white/60 hover:text-white/80 hover:border-white/30'
                  }`}
                >
                  {category}
                </button>
              ))
          }
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'blog' ? (
            <motion.div
              key="blog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured Post */}
              {filteredPosts.find(post => post.featured) && (
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
                    Featured Article
                  </div>
                  <BlogPostCard 
                    post={filteredPosts.find(post => post.featured)!} 
                    featured={true}
                    onClick={setSelectedPost}
                  />
                </motion.div>
              )}

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.filter(post => !post.featured).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <BlogPostCard post={post} onClick={setSelectedPost} />
                  </motion.div>
                ))}
              </div>

              {/* View More Button */}
              <motion.div
                className="flex justify-center mt-20 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="group relative px-16 py-5 border-2 border-white/30 bg-gradient-to-r from-white/5 to-white/10 
                           hover:from-white/10 hover:to-white/15 text-white hover:border-white/50 
                           transition-all duration-500 overflow-hidden backdrop-blur-md shadow-2xl
                           hover:shadow-blue-500/20"
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Aquí puedes añadir la lógica para cargar más artículos
                    console.log('Loading more articles...');
                  }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] 
                                transition-transform duration-1000 bg-gradient-to-r from-transparent 
                                via-white/20 to-transparent skew-x-12" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center gap-4">
                    <span className="text-base uppercase tracking-[0.3em] font-semibold">
                      View More Articles
                    </span>
                    <motion.div
                      className="flex items-center"
                      animate={{ x: 0 }}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight size={20} className="drop-shadow-lg" />
                    </motion.div>
                  </div>

                  {/* Glowing border effect */}
                  <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500/50 
                                via-purple-500/50 to-cyan-500/50 rounded-sm opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500 blur-sm" />
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="resources"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <BlogPostModal 
              post={selectedPost} 
              onClose={() => setSelectedPost(null)} 
            />
          )}
        </AnimatePresence>
      </ScrollSection>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 2) * 50}%`
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6
            }}
          />
        ))}
      </div>
    </section>
  );
}

// Componente para card de blog post
interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
  onClick: (post: BlogPost) => void;
}

function BlogPostCard({ post, featured = false, onClick }: BlogPostCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Planetary Defense': return '�️';
      case 'Research': return '🔬';
      case 'Mission Updates': return '🚀';
      case 'Analysis': return '📊';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Planetary Defense': return '#FF6B35';
      case 'Research': return '#00D4FF';
      case 'Mission Updates': return '#8B5CF6';
      case 'Analysis': return '#10B981';
      default: return '#6B7280';
    }
  };

  if (featured) {
    return (
      <motion.article
        className="group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative overflow-hidden bg-white/5 border border-white/10 
                        hover:border-white/20 transition-all duration-300">
          {/* Image */}
          {post.imageUrl && (
            <div className="relative h-64 overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>

            <h3 className="text-xl text-white mb-4 group-hover:text-white/80 transition-colors">
              {post.title}
            </h3>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-white/40 border border-white/20 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Button */}
              <motion.button
                onClick={() => onClick(post)}
                className="group/btn relative px-8 py-3 border-2 border-white/30 bg-gradient-to-r from-white/5 to-white/10 
                         hover:from-white/10 hover:to-white/15 text-white hover:border-white/50 
                         transition-all duration-500 overflow-hidden backdrop-blur-md shadow-lg
                         hover:shadow-blue-500/20 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 
                              opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] 
                              transition-transform duration-1000 bg-gradient-to-r from-transparent 
                              via-white/20 to-transparent skew-x-12" />
                
                <div className="relative flex items-center gap-2 text-sm font-medium">
                  <span>Leer más</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300 drop-shadow-lg" />
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500/50 
                              via-purple-500/50 to-cyan-500/50 rounded-sm opacity-0 group-hover/btn:opacity-100 
                              transition-opacity duration-500 blur-sm" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full bg-white/5 border border-white/10 hover:border-white/20 
                      transition-all duration-300 flex flex-col">
        {/* Image */}
        {post.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>

          <h3 className="text-lg text-white mb-3 group-hover:text-white/80 transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-1">
              {post.tags.slice(0, 1).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-white/40 border border-white/20 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read More Button */}
            <motion.button
              onClick={() => onClick(post)}
              className="group/btn relative px-5 py-2 border-2 border-white/30 bg-gradient-to-r from-white/5 to-white/10 
                       hover:from-white/10 hover:to-white/15 text-white hover:border-white/50 
                       transition-all duration-500 overflow-hidden backdrop-blur-md shadow-lg
                       hover:shadow-blue-500/20 cursor-pointer"
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 
                            opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] 
                            transition-transform duration-1000 bg-gradient-to-r from-transparent 
                            via-white/20 to-transparent skew-x-12" />
              
              <div className="relative flex items-center gap-1 text-xs font-medium">
                <span>Leer más</span>
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-300 drop-shadow-lg" />
              </div>

              {/* Glowing border effect */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500/50 
                            via-purple-500/50 to-cyan-500/50 rounded-sm opacity-0 group-hover/btn:opacity-100 
                            transition-opacity duration-500 blur-sm" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Componente para card de recurso
interface ResourceCardProps {
  resource: Resource;
}

function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText size={20} />;
      case 'Video': return <Video size={20} />;
      case 'Article': return <BookOpen size={20} />;
      case 'Dataset': return <Download size={20} />;
      case 'Web App': return <ExternalLink size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return '#EF4444';
      case 'Video': return '#8B5CF6';
      case 'Article': return '#10B981';
      case 'Dataset': return '#F59E0B';
      case 'Web App': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white/5 border border-white/10 hover:border-white/20 
                      transition-all duration-300 p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div 
            className="p-3 border rounded-none"
            style={{ 
              borderColor: getTypeColor(resource.type),
              color: getTypeColor(resource.type)
            }}
          >
            {getTypeIcon(resource.type)}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="text-xs uppercase tracking-[0.2em] px-2 py-1 border"
                style={{ 
                  borderColor: getTypeColor(resource.type),
                  color: getTypeColor(resource.type)
                }}
              >
                {resource.type}
              </span>
              <span className="text-xs text-white/40">
                {resource.category}
              </span>
            </div>

            <h3 className="text-white text-lg mb-2 group-hover:text-white/80 transition-colors">
              {resource.title}
            </h3>

            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {resource.description}
            </p>

            <div className="flex items-center justify-end">
              <button 
                onClick={() => window.open(resource.url, '_blank')}
                className="group/btn relative px-5 py-2 border-2 border-white/30 bg-gradient-to-r from-white/5 to-white/10 
                         hover:from-white/10 hover:to-white/15 text-white hover:border-white/50 
                         transition-all duration-500 overflow-hidden backdrop-blur-md shadow-lg
                         hover:shadow-blue-500/20 cursor-pointer"
                style={{
                  borderColor: getTypeColor(resource.type) + '40',
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                     style={{
                       background: `linear-gradient(90deg, ${getTypeColor(resource.type)}20, ${getTypeColor(resource.type)}10)`
                     }} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] 
                              transition-transform duration-1000 bg-gradient-to-r from-transparent 
                              via-white/20 to-transparent skew-x-12" />
                
                <div className="relative flex items-center gap-2 text-sm font-medium">
                  <span>Access</span>
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300 drop-shadow-lg" />
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover/btn:opacity-100 
                              transition-opacity duration-500 blur-sm rounded-sm"
                     style={{
                       background: `linear-gradient(90deg, ${getTypeColor(resource.type)}50, ${getTypeColor(resource.type)}30)`
                     }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Modal para blog post
interface BlogPostModalProps {
  post: BlogPost;
  onClose: () => void;
}

function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-black border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-red-500/20 
                     border border-white/20 hover:border-red-400/50 text-white hover:text-red-400 
                     transition-all duration-300 backdrop-blur-sm group cursor-pointer"
          >
            <X size={20} className="group-hover:scale-110 transition-transform duration-300" />
          </button>

          <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl text-white mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-white/40 border border-white/20 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-64 object-cover mb-8"
            />
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed text-lg mb-6">
              {post.excerpt}
            </p>
            
            <div className="text-white/70 leading-relaxed space-y-4">
              <p>
                {post.content}
              </p>
              
           
            </div>
            
            {/* Botón para leer más en NASA */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <button
                onClick={() => window.open(post.sourceUrl, '_blank')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Leer más en NASA</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}