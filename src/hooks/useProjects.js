import { useEffect, useState } from 'react';
import { projects as localProjects } from '../data/portfolio';
import { projectRepository } from '../services/projectRepository';

export function useProjects({ featuredOnly = false } = {}) {
  const initialProjects = featuredOnly
    ? localProjects.filter((project) => project.featured)
    : localProjects;
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    const controller = new AbortController();

    projectRepository
      .list({ featuredOnly, signal: controller.signal })
      .then(setProjects)
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error);
      });

    return () => controller.abort();
  }, [featuredOnly]);

  return projects;
}
