import { VsFileTypeNext, VsFileTypeNestjs, VsFileTypePrisma } from '@kalimahapps/vue-icons'
import { SiMysql, SiReacthookform, SiLaragon, SiPhp } from '@kalimahapps/vue-icons'
import { BsBootstrapFill } from '@kalimahapps/vue-icons'
export const projects = [
  {
    id: 1,
    title: 'Ezrent',
    description:
      'Ezrent is an innovative rental platform for individual and business users. Easy rental experience with a variety of goods and services.',
    image: 'https://dariazzidane.vercel.app/img/ezrent.png',
    demo: 'https://ezrent.my.id',
    repo: 'https://github.com/muhammaddariazzidane/Front-end-Capstone',
    tech: [
      {
        id: 1,
        value: VsFileTypeNext,
        color: 'black'
      },
      {
        id: 2,
        value: VsFileTypeNestjs
      },
      {
        id: 3,
        value: VsFileTypePrisma,
        color: 'emerald'
      },
      {
        id: 4,
        value: SiMysql
      },
      {
        id: 5,
        value: SiReacthookform
      }
    ]
  },
  {
    id: 2,
    title: 'Website BLT Management',
    description:
      'The Profile Website of Tambaksari Village serves as an informative platform that showcases the rich history, cultural heritage, and ongoing development initiatives of the village. In addition, Tambaksari Village actively manages the Direct Cash Assistance (BLT) program, a government initiative that provides financial support to eligible individuals and families. With a systematic data management system in place, the village administration ensures accurate beneficiary registration, verification processes, and efficient monitoring of the programs effectiveness. By combining the websites informative features and effective data management.',
    image: 'https://dariazzidane.vercel.app/img/tambaksari.png',
    demo: 'https://desa-tambaksari.000webhostapp.com/',
    repo: '',
    tech: [
      {
        id: 1,
        value: BsBootstrapFill,
        color: 'indigo'
      },
      {
        id: 2,
        value: SiPhp,
        color: 'purple'
      },
      {
        id: 3,
        value: SiMysql
      },
      {
        id: 4,
        value: SiLaragon,
        color: 'cyan'
      }
    ]
  }
]
