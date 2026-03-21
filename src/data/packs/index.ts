import { businessPack } from './businessPack'
import { toeicPack } from './toeicPack'
import { academicPack } from './academicPack'
import { medicalPack } from './medicalPack'
import { itTechPack } from './itTechPack'
import { travelPack } from './travelPack'
import { WordPackData } from '../../types/wordPack'

export const PACK_REGISTRY: WordPackData[] = [
  businessPack, toeicPack, academicPack, medicalPack, itTechPack, travelPack
]

export const getPackById = (id: string): WordPackData | undefined =>
  PACK_REGISTRY.find(p => p.meta.id === id)

export const getPackMeta = () => PACK_REGISTRY.map(p => p.meta)
