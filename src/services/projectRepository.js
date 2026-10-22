import { projects as localProjects } from '../data/portfolio';

const apiBaseUrl = import.meta.env.VITE_PORTFOLIO_API_URL?.replace(/\/$/, '');

function isProject(value) {
  return value
    && typeof value.id === 'string'
    && typeof value.slug === 'string'
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && Array.isArray(value.technologies);
}

function orderByPriority(projects) {
  return [...projects].sort((first, second) => (
    (first.priority ?? Number.MAX_SAFE_INTEGER)
    - (second.priority ?? Number.MAX_SAFE_INTEGER)
  ));
}

function validateProjects(payload) {
  if (!Array.isArray(payload) || !payload.every(isProject)) {
    throw new Error('The portfolio API returned an invalid projects payload.');
  }

  return orderByPriority(payload);
}

async function fetchProjectsFromApi({ featuredOnly, signal }) {
  const query = featuredOnly ? '?featured=true' : '';
  const response = await fetch(`${apiBaseUrl}/projects${query}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`The portfolio API returned HTTP ${response.status}.`);
  }

  const payload = await response.json();
  return validateProjects(payload.data ?? payload);
}

function getLocalProjects({ featuredOnly }) {
  const selectedProjects = featuredOnly
    ? localProjects.filter((project) => project.featured)
    : localProjects;

  return orderByPriority(selectedProjects);
}

export const projectRepository = {
  async list({ featuredOnly = false, signal } = {}) {
    if (!apiBaseUrl) return getLocalProjects({ featuredOnly });

    try {
      return await fetchProjectsFromApi({ featuredOnly, signal });
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      console.warn('Portfolio API unavailable; displaying local project data.', error);
      return getLocalProjects({ featuredOnly });
    }
  },
};
