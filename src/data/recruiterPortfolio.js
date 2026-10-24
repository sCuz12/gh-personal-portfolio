export const recruiterProfile = {
  name: 'George Hadjisavva',
  role: 'Backend Engineer',
  summary: 'I build reliable backend systems, integrations, and data-heavy products, with 7+ years of experience across high-traffic platforms, telecom, and independent product work.',
  location: 'Cyprus',
  timezone: 'EU time · EET / EEST',
  workMode: 'Remote · working globally',
  availability: 'Open to backend engineering roles',
  focus: 'Go · distributed systems · integrations',
};

export const skillGroups = [
  {
    level: 'Primary',
    note: 'Core tools in recent production and independent work.',
    skills: ['Go', 'PHP / Laravel', 'REST APIs', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Git'],
  },
  {
    level: 'Comfortable',
    note: 'Used across shipped products and professional teams.',
    skills: ['JavaScript', 'TypeScript', 'React', 'MySQL', 'Elasticsearch', 'MongoDB', 'Kubernetes', 'AWS S3', 'ELK / Graylog'],
  },
  {
    level: 'Familiar',
    note: 'Applied in earlier work, side projects, or active exploration.',
    skills: ['Python', 'Java / Spring Boot', 'LangGraph', 'AI agents', 'MCP', 'Tailwind CSS'],
  },
];

export const experience = [
  {
    company: 'Independent',
    role: 'Backend Systems Engineer',
    period: 'Oct 2025 — Present',
    summary: 'Backend integrations and automation for multiple companies.',
    highlights: [
      'Build Go-based synchronization and automation systems spanning ERP, e-commerce, and backend workflows.',
      'Design multi-tenant product, inventory, pricing, and order synchronization for ERP-to-Shopify integrations.',
      'Develop asynchronous data pipelines with APIs, PostgreSQL, Redis, queues, and AI-assisted automation.',
    ],
  },
  {
    company: 'Intergo Telecom · SMS.to',
    role: 'Backend Developer',
    period: 'Apr 2024 — Oct 2025',
    summary: 'Messaging infrastructure and service-oriented backend systems.',
    highlights: [
      'Refactored monolithic code into service-oriented components to improve isolation, maintainability, and scale.',
      'Built a Go microservice using goroutines and channels for asynchronous bulk-data processing.',
      'Introduced RabbitMQ-based event flows across services and delivered Laravel APIs from business requirements.',
    ],
  },
  {
    company: 'Aylo · formerly MindGeek',
    role: 'Software Developer',
    period: '2020 — 2024',
    summary: 'High-traffic platform engineering in a large-scale product environment.',
    highlights: [
      'Developed backend features and services for workloads reaching 30k requests per second.',
      'Built Laravel microservices and Go backend services for high-throughput processing.',
      'Improved search latency through caching, query rewrites, and index optimization; monitored production through Kibana and Sentry.',
    ],
  },
  {
    company: 'Cablenet Telecommunications',
    role: 'Software Developer',
    period: 'Apr 2019 — Jul 2020',
    summary: 'Telecom operations software and billing-system migration.',
    highlights: [
      'Worked across the full delivery lifecycle, from requirements through deployment.',
      'Helped build an automated fibre-optic provisioning system with Spring Boot and Symfony.',
      'Contributed to an Oracle billing migration alongside Oracle and Intrasoft teams.',
    ],
  },
];

export const corporateProjects = [
  {
    id: 'corporate-high-traffic-platform',
    context: 'AYLO · PRODUCTION',
    title: 'High-traffic platform services',
    description: 'Backend features, Laravel microservices, and Go services supporting workloads reaching 30k requests per second, with production monitoring and search-performance work.',
    technologies: ['Go', 'Laravel', 'Elasticsearch', 'Kibana', 'Sentry'],
  },
  {
    id: 'corporate-messaging-processing',
    context: 'SMS.TO · PRODUCTION',
    title: 'Asynchronous messaging infrastructure',
    description: 'A Go bulk-processing service and RabbitMQ event flows designed to decouple services and handle asynchronous workloads more cleanly.',
    technologies: ['Go', 'RabbitMQ', 'Laravel', 'Microservices'],
  },
  {
    id: 'corporate-telecom-provisioning',
    context: 'CABLENET · INTERNAL SYSTEM',
    title: 'Fibre provisioning & billing migration',
    description: 'Operational software for automated fibre provisioning, plus engineering support for a multi-party Oracle billing-system migration.',
    technologies: ['Spring Boot', 'Symfony', 'Oracle'],
  },
];
