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
    color: '#ffddf1',
    notes: 11,
  },
  {
    id: 1,
    name: 'Front-end Folder',
    color: '#ddff3d',
    notes: 5,
  },
  {
    id: 2,
    name: 'Back-end Folder',
    color: '#dd1fdf',
    notes: 3,
  },
  {
    id: 3,
    name: 'full-stack Folder',
    color: '#8339de',
    notes: 22,
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

const typeData = [
  {
    title: 'Crono',
    icon: 'timer-outline',
    id: 1,
    url: 'https://assets10.lottiefiles.com/packages/lf20_ag0f5tt4.json',
  },
  {
    title: 'Timer',
    icon: 'timer-sand',
    id: 2,
    url: 'https://assets3.lottiefiles.com/packages/lf20_4yofoa5q.json',
  },
  {
    title: 'Counter',
    icon: 'counter',
    id: 3,
    url: 'https://assets4.lottiefiles.com/packages/lf20_8sjqrjby.json',
  },
];
const metaData = [
  {
    title: 'Achievement',
    icon: 'certificate',
    id: 1,
    url: 'https://assets8.lottiefiles.com/packages/lf20_xeUyRVC1G3.json',
  },
  {
    title: 'Registry',
    icon: 'notebook',
    id: 2,
    url: 'https://assets9.lottiefiles.com/packages/lf20_ikyhq0rk.json',
  },
];

export {folders, tasksData, metaData, typeData};
