import useStorage from '~/composables/useStorage'
import { Article } from '~/server/models/v2/article'
 
type ArticleReading = {
    articleId: number
    readingDuration: number
}
 
type UserReadingHabits = {
    accessSpecificSections: number[]
    accessSpecificArticles: number[]
    articleReadingDuration:ArticleReading[]
    readingDuration:number
    readAndParticipateInDiscussions: number[]
    useSearchTools: string[]
}
 
export default (entity?: Article) => {
    const { get, set } = useStorage()
 
    let startTime = Date.now()
 
    const getReadingHabits = (): UserReadingHabits => {
        const readingHabits = get('readingHabits')
        return readingHabits ? JSON.parse(readingHabits) : {
            accessSpecificSections: [],
            accessSpecificArticles: [],
            articleReadingDuration: [],
            readingDuration:0,
            readAndParticipateInDiscussions: [],
            useSearchTools: []
        }
    }
 
    const setReadingHabits = (readingHabits: UserReadingHabits) => {
        set('readingHabits', readingHabits)
    }
 
    const addReadingHabit = (readingHabit: ArticleReading) => {
        const readingHabits = getReadingHabits()
        const index = readingHabits.articleReadingDuration.findIndex((articleReading) => articleReading.articleId === readingHabit.articleId)
        if (index !== -1) {
            readingHabits.articleReadingDuration[index].readingDuration += readingHabit.readingDuration
            setReadingHabits(readingHabits)
            return
        }
        readingHabits.articleReadingDuration.push(readingHabit)
        setReadingHabits(readingHabits)
    }
 
    const addAccessSpecificSection = (sectionId: number) => {
        const readingHabits = getReadingHabits()
        if (readingHabits.accessSpecificSections.includes(sectionId)) return
        readingHabits.accessSpecificSections.push(sectionId)
        setReadingHabits(readingHabits)
    }
 
    const addAccessSpecificArticle = (articleId: number) => {
        const readingHabits = getReadingHabits()
        if (readingHabits.accessSpecificArticles.includes(articleId)) return
        readingHabits.accessSpecificArticles.push(articleId)
        setReadingHabits(readingHabits)
    }
 
    const addReadAndParticipateInDiscussions = (discussionId: number) => {
        const readingHabits = getReadingHabits()
        if (readingHabits.readAndParticipateInDiscussions.includes(discussionId)) return
        readingHabits.readAndParticipateInDiscussions.push(discussionId)
        setReadingHabits(readingHabits)
    }
 
    const addUseSearchTools = (searchTool: string) => {
        const readingHabits = getReadingHabits()
        if (readingHabits.useSearchTools.includes(searchTool)) return
        readingHabits.useSearchTools.push(searchTool)
        setReadingHabits(readingHabits)
    }
 
    const addReadingDuration = (readingDuration: number) => {
        const readingHabits = getReadingHabits()
        readingHabits.readingDuration += readingDuration
        setReadingHabits(readingHabits)
    }
 
    onBeforeUnmount(()=>{
        addReadingDuration(Date.now() - startTime)
        // check if entity is an article, if so add reading duration of article
        if(entity){
            addReadingHabit({
                articleId: entity.id!,
                readingDuration: Date.now() - startTime
            })
        }
    })
 
    return {
        getReadingHabits,
        setReadingHabits,
        addReadingHabit,
        addAccessSpecificSection,
        addAccessSpecificArticle,
        addReadAndParticipateInDiscussions,
        addUseSearchTools,
        addReadingDuration
    }
}