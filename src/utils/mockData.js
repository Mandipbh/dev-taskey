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
    color: '#22ffdd',
    folder: 'DEVELOPMENT FOLDER',
    type: 'Crono',
    totalmins: '100min',
    done: '50%',
    tasks: [
      {
        id: 0,
        title: 'Task name eyamole',
        color: '#ffddff',
        folder: 'global',
        status: 1,
        path: 10,
        percentage: 10,
      },
      {
        id: 1,
        title: 'Task• example 2',
        color: '#ffddff',
        folder: 'global',
        status: 0,
        path: 20,
        percentage: 20,
      },
      {
        id: 2,
        title: 'Task examole',
        color: '#ffddff',
        folder: 'global',
        status: 1,
        path: 20,
        percentage: 20,
      },
      {
        id: 3,
        title: 'Task examole 2',
        color: '#ffddff',
        folder: 'global',
        status: 1,
        path: 20,
        percentage: 20,
      },
    ],
  },
  {
    id: 1,
    title: 'Lorem ipsum',
    color: '#000000',
    folder: 'GLOBAL CRONO',
    desc: 'Lorem ipsum may be used as a placeholder before final copy is available.',
    type: 'Crono',
    totalmins: '100min',
    done: '50%',
    tasks: [],
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

const chips = [
  {
    label: 'Crono Task',
    tintColor: '#00A3DB',
    id: '1',
  },
  {
    label: 'Timer Task',
    tintColor: '#834895',
    id: '2',
  },
  {
    label: 'Counter Task',
    tintColor: '#F0672C',
    id: '3',
  },
];

const statisticdata = [
  {
    id: '1',
    label: 'Number of Task',
    value: 10000,
  },
  {
    id: '2',
    label: 'Total Time',
    value: 10.0,
  },
  {
    id: '3',
    label: 'Total Count',
    value: 9999,
  },
];

const statisticdataone = [
  {
    id: '1',
    label: 'Achievement Tasks',
    value: 4000,
  },
  {
    id: '2',
    label: 'Completed Tasks',
    value: 2000,
    CheckBox: true,
    isCheckBox: true,
  },
  {
    id: '3',
    label: 'Perecentage of Success',
    value: 50,
  },
];

const statisticdatatwo = [
  {
    id: '1',
    label: 'Achievement Tasks in progrees',
    value: 1500,
  },
  {
    id: '2',
    label: 'Perecentage of progrees',
    value: 50,
  },
  {
    id: '3',
    label: 'Achievement Tasks time',
    value: 4.0,
  },
  {
    id: '4',
    label: 'Achievement Tasks Counter',
    value: 1000,
  },
];
const statisticdatathree = [
  {
    id: '1',
    label: 'Registry Tasks',
    value: 600,
  },
  {
    id: '2',
    label: 'Registry Tasks Time',
    value: 2.0,
  },
  {
    id: '3',
    label: 'Registry Tasks Counter',
    value: 500,
  },
];
const colorData = [
  {
    key: 1,
    value: 50,
    svg: {fill: '#daa520'},
  },
  {
    key: 2,
    value: 50,
    svg: {fill: '#ffe4e1'},
  },
  {
    key: 3,
    value: 40,
    svg: {fill: '#600080'},
  },
];
const colorDataTwo = [
  {
    key: 1,
    value: 50,
    svg: {fill: '#4682b4'},
  },
  {
    key: 2,
    value: 50,
    svg: {fill: '#ff0000'},
  },
  {
    key: 3,
    value: 40,
    svg: {fill: '#008000'},
  },
];
export {
  folders,
  tasksData,
  metaData,
  typeData,
  chips,
  statisticdata,
  statisticdataone,
  statisticdatatwo,
  statisticdatathree,
  colorData,
  colorDataTwo,
};
