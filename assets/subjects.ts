export interface SubjectsType {
    subjectId: string
    name: string
    img: string
    color: string
    id: number
}

export const subjects: SubjectsType[] = [
    { subjectId: 'matematica', name: 'Matemática', img: 'math', color: '#198fcb', id: 1}, 
    { subjectId: 'portgues', name: 'Português', img: 'portuguese', color: '#f96f5d', id: 2},
    { subjectId: 'geografia', name: 'Geografia', img: 'geography', color: '#8cb369', id: 3},
    { subjectId: 'historia', name: 'História', img: 'history', color: '#bb9457', id: 4},
    { subjectId: 'fisica', name: 'Física', img: 'physics', color: '#006ba6', id: 5},
    { subjectId: 'quimica', name: 'Química', img: 'chemestry', color: '#6e44ff', id: 6},
    { subjectId: 'biologia', name: 'Biologia', img: 'biology', color: '#42a59f', id: 7}
]