export const tabs = [
  {
    title: 'Type',
    id: '0',
  },
  {
    title: 'Status',
    id: '1',
  },
];

const folders = [
  {
    id: 0,
    name: 'Global List Folder',
    color: '#000000',
  },
  {
    id: 1,
    name: 'Front-end Folder',
    color: '#000000',
  },
  {
    id: 2,
    name: 'Back-end Folder',
    color: '#000000',
  },
  {
    id: 3,
    name: 'full-stack Folder',
    color: '#000000',
  },
];

const tasksData = [
  {
    id: 0,
    title: 'Lorem ipsum',
    color: '#ffddff',
    folder: 'global',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Crono',
  },
  {
    id: 1,
    title: 'Lorem ipsum',
    color: '#22ffdd',
    folder: 'frontend',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Crono',
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    color: '#22ff',
    folder: 'frontend',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Timer',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    color: '#ffdd11',
    folder: 'backend',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Counter',
  },
  {
    id: 4,
    title: 'Lorem ipsum',
    color: '#ff6688',
    folder: 'frontend',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Crono',
  },
  {
    id: 6,
    title: 'Lorem ipsum',
    color: '#45ff',
    folder: 'full-stack',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Timer',
  },
];

export const taskstype = [
  {
    id: 1,
    type: 'Crono',
    data: [
      {
        id: 1,
        title: 'Lorem ipsum',
        color: '#ffddff',
        folder: 'global',
        desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
        type: 'Crono',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Lorem ipsum',
        color: '#22ffdd',
        folder: 'frontend',
        desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
        type: 'Crono',
        status: 'completed',
      },
    ],
  },
  {
    id: 2,
    type: 'Timer',
    data: [
      {
        id: 1,
        title: 'Lorem ipsum',
        color: '#22ff',
        folder: 'frontend',
        desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
        type: 'Timer',
        status: 'Failed',
      },
      {
        id: 2,
        title: 'Lorem ipsum',
        color: '#45ff',
        folder: 'full-stack',
        desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
        type: 'Timer',
        status: 'inProgress',
      },
    ],
  },
  {
    id: 3,
    type: 'Counter',
    data: [
      {
        id: 1,
        title: 'Lorem ipsum',
        color: '#ffdd11',
        folder: 'backend',
        desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
        type: 'Counter',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Lorem ipsum',
        color: '#45ff',
        folder: 'full-stack',
        desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
        type: 'Timer',
        status: 'Failed',
      },
    ],
  },
];

export {folders, tasksData};
