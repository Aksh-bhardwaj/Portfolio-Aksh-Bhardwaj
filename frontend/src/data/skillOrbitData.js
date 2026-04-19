// Orbit scene: adjust `speed` and `orbitRadius` for each body.

export const CENTER_LABEL = {
    role: 'Full Stack Engineer',
    name: 'Aksh Bhardwaj',
};

export const CATEGORY_META = {
    Frontend: { color: '#22d3ee', label: 'Frontend' },
    Backend: { color: '#4ade80', label: 'Backend' },
    Cloud: { color: '#fb923c', label: 'Cloud / Infra' },
    Data: { color: '#60a5fa', label: 'Data' },
    Events: { color: '#a78bfa', label: 'Events / Streaming' },
    DevOps: { color: '#f472b6', label: 'DevOps / Tooling' },
};

export const STACK_PLANETS = [
    {
        id: 'react',
        label: 'React',
        category: 'Frontend',
        color: '#61DAFB',
        orbitRadius: 2.65,
        speed: 0.5,
        modalTitle: 'React',
        modalBody: 'UI with React, modern JS, and component-based structure.',
    },
    {
        id: 'django',
        label: 'Django',
        category: 'Backend',
        color: '#44B78B',
        orbitRadius: 3.15,
        speed: 0.44,
        modalTitle: 'Django',
        modalBody: 'APIs with Django and DRF, auth, and serialization as needed.',
    },
    {
        id: 'aws',
        label: 'AWS',
        category: 'Cloud',
        color: '#FF9900',
        orbitRadius: 3.65,
        speed: 0.38,
        modalTitle: 'AWS',
        modalBody: 'EC2, S3, and Lambda for hosting, storage, and small serverless jobs.',
    },
    {
        id: 'kafka',
        label: 'Kafka',
        category: 'Events',
        color: '#a78bfa',
        orbitRadius: 4.2,
        speed: 0.32,
        modalTitle: 'Kafka',
        modalBody: 'Event streaming and decoupled service communication.',
    },
    {
        id: 'postgres',
        label: 'PostgreSQL',
        category: 'Data',
        color: '#336791',
        orbitRadius: 4.75,
        speed: 0.26,
        modalTitle: 'PostgreSQL',
        modalBody: 'Relational data with Django ORM, indexes, and query tuning.',
    },
];

export const OUTER_TOOLS = [
    {
        id: 'git',
        label: 'Git',
        category: 'DevOps',
        color: '#F05032',
        orbitRadius: 5.85,
        ringSpeed: 0.11,
        slotAngle: 0,
        modalTitle: 'Git',
        modalBody: 'Version control and collaboration via Git/GitHub.',
    },
    {
        id: 'docker',
        label: 'Docker',
        category: 'DevOps',
        color: '#2496ED',
        orbitRadius: 5.85,
        ringSpeed: 0.11,
        slotAngle: (2 * Math.PI) / 3,
        modalTitle: 'Docker',
        modalBody: 'Containerized environments for consistent builds and deploys.',
    },
    {
        id: 'postman',
        label: 'Postman',
        category: 'DevOps',
        color: '#FF6C37',
        orbitRadius: 5.85,
        ringSpeed: 0.11,
        slotAngle: (4 * Math.PI) / 3,
        modalTitle: 'Postman',
        modalBody: 'API requests, collections, and debugging.',
    },
];
