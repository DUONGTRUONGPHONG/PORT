<script setup lang="ts">
const EventStore = useEventStore();
const route = useRoute()

const props = defineProps<{ category?: any, payload?: any, subtree?: any , pagination?:any,}>();
const top3 = computed(() => {
    return _Slice(props.payload, 1, 4)
})

const listArticle = computed(() => props.payload ? props.payload : [])
const eventSlug = route.params.eventSlug as string
const segments = _Split(eventSlug, '-')
const eventId = Number(segments[segments.length - 1])

// Get List Event New
const listEvent = ref<any>()
const event = ref<any>()

async function loadDataDefault() {
    // list su kien
    listEvent.value = await EventStore.fetchPagingWithFiltering(1, 3, 10);

    // chi tiet su kien
    event.value = await EventStore.fetchByEventId(eventId);
    console.log(event.value);
}

async function main() {
    await loadDataDefault(); // Đợi loadDataDefault hoàn thành trước
    const eventTitle = event.value;
    console.log(eventTitle);
}
main();
// Get List Event End
</script>

<template>
    <Wrap>
        <!-- Event trending -->
        <section class="zone zone--breaking">
            <div class="flex items-center max-w-full px-4 mx-auto xs:px-6 lg:px-0 xl:max-w-6xl">
                <h2 class="zone__title"><span>dòng sự kiện</span></h2>
                <div class="zone__content">
                    <NuxtLink v-for="(event, index) in listEvent" :key="index" class="item"
                        :to="utils.generateSlugWithId('/event', event?.slug as string, event?.id as number)">
                            {{ event.title }}
                    </NuxtLink>
                </div>
            </div>
        </section>
        <!-- End Event trending -->
        
        <Row class="pt-5">
            <BreadcrumbCategory :category="category" :subtree="subtree" />
        </Row>
        <Row class="mt-5">
            <MainCol>
                <div class="flex items-center mt-5 mb-5">
                    <ul
                        class="bg-red-500 text-white text-sm font-semibold hover:bg-red-400 font-medium inline-block rounded-tl-lg rounded-br-lg">
                        <li
                            class="inline-block uppercase rounded-l-lg border-radius border-red-500 border-r-0 px-2 py-1 text-center block transition-transform duration-300 transform hover:scale-105">
                            <NuxtLink :to="eventSlug">
                                {{ event?.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                    <div class="border border-slate-7 flex-grow ml-4"></div>
                </div>
                {{ console.log(listArticle) }}
                <Article v-for="(item, index) in listArticle" :key="index" mode="event" class="m-4" image-size="md" text-size="sm" 
                    :title="item?.title" :brief="item?.intro"
                    :slug="'/' + item.category?.code + '/' + item.code"
                    :thumb="item?.thumbnail"
                    :authors="item?.authors"
                    :createdOn="item?.createdOn" /> 
                <Pagination v-if="listArticle.length > 0" :payload="pagination" class="mt-6" />
            </MainCol>
            <RightCol class="pl-8 hidden xl:block">
                <div class="grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1 h-80">
                    Mời<br />
                    Quảng cáo
                </div>
                <div class="border-b-2 mt-10">
                    <p class="text-lg font-semibold">Tin xem nhiều</p>
                </div>
                <div class="mt-4">
                    <ArticleBasicHorizontal v-for="(item, index) in listArticle" :key="index" image-size="sm"
                        :title="item.title" :slug="'/' + item.category?.code + '/' + item.code"
                        :thumb="item?.thumbnail" :class="[index !== 0 ? 'pt-4 mt-4 border-t' : '']" />
                </div>
            </RightCol>
        </Row>
    </Wrap>
</template>
<style lang="css" scoped>
.zone--breaking {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
}
.zone {
    margin-bottom: 1rem;
}
.zone--breaking .zone__title {
    flex-basis: 120px;
    margin-bottom: 0;
    font-size: 0.75em;
}
.zone__title {
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-family: 'Work Sans';
    display: inline-block;
    padding-right: 1rem;
    background-color: white;
    position: relative;
}
.zone__title span, .zone__title a {
    background-color: #FF0018;
    color: white;
    display: inline-block;
    border-radius: 0.5rem 0 0.5rem 0;
    padding: 0.25rem 0.5rem;
    font-weight: 500;
}

.zone--breaking .zone__content {
    flex-basis: calc(100% - 128px);
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100%;
    font-size: 16px;
    margin: 5px 0px;
    scrollbar-color: #f5f5f5 transparent;
    scrollbar-width: thin;
}

.zone--breaking .zone__content::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
.zone--breaking .zone__content::-webkit-scrollbar-thumb {
    background: #9c9b9b;
    border-radius: 4px;
}
.zone--breaking .zone__content::-webkit-scrollbar-track {
    background: transparent;
}
.zone--breaking .zone__content .item::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 4px;
    transform: translateY(-50%);
    background-color: #FF0018;
    border-radius: 50%;
}
.zone__content::after {
    display: block;
    content: "";
    clear: both;
}

.zone--breaking .zone__content .item {
    display: inline-block;
    font-size: 0.75rem;
    line-height: 2;
    text-transform: uppercase;
    padding-left: 0.75rem;
    position: relative;
    margin-right: 1rem;
    color: #757575;
}


</style>