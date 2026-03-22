import { businessPack } from './businessPack'
import { toeicPack } from './toeicPack'
import { academicPack } from './academicPack'
import { medicalPack } from './medicalPack'
import { itTechPack } from './itTechPack'
import { travelPack } from './travelPack'
import { advancedAcademicPack } from './advancedAcademicPack'
import { literaryPack } from './literaryPack'
import { philosophyPack } from './philosophyPack'
import { socialSciencePack } from './socialSciencePack'
import { naturalSciencePack } from './naturalSciencePack'
import { lawPoliticsPack } from './lawPoliticsPack'
import { WordPackData } from '../../types/wordPack'

export const PACK_REGISTRY: WordPackData[] = [
  businessPack, toeicPack, academicPack, medicalPack, itTechPack, travelPack,
  advancedAcademicPack, literaryPack, philosophyPack, socialSciencePack, naturalSciencePack,
  lawPoliticsPack
]

export const getPackById = (id: string): WordPackData | undefined =>
  PACK_REGISTRY.find(p => p.meta.id === id)

export const getPackMeta = () => PACK_REGISTRY.map(p => p.meta)
