<script setup>
const props = defineProps({
    total: Number
})
const showCommentListing = ref(false)
const showFormComment = ref(false)
const showModalSend = ref(false)

const yourComment = ref('')
const submidSend = () => {
    showModalSend.value = true
}
</script>
<template>
    <section>
        <div class="flex items-center mb-[1rem]">
            <h3 class="font-bold text-[1.5rem]">Ý kiến bạn đọc <span class="comment__count">({{ props.total }})</span></h3>
            <div class="ms-auto relative">
                <select name="" id=""
                    class="py-[0.25rem] pl-[8px] pr-[2.25rem] text-[0.875rem] block w-full leading-[1.5] bg-white border border-solid border-[#bdbdbd] rounded-[0.25rem] appearance-none">
                    <option>Quan tâm nhất</option>
                    <option>Mới nhất</option>
                </select>
                <div class="absolute right-[0.25rem] top-[50%] translate-y-[-50%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="">
            <form action="post">
                <textarea class="w-full p-[0.75rem] border border-solid border-[#bdbdbd ] rounded-[0.25rem]" rows="2"
                    placeholder="Your comment" v-model="yourComment"></textarea>
                <div class="flex justify-end items-center">
                    <div class="mr-[0.75rem] flex items-center">
                        <img src="http://picsum.photos/1024/600?random=1" alt=""
                            class="w-[32px] h-[32px] mr-[0.25rem] rounded-full"><span class="text-[0.75rem]">Barry
                            Allen</span>
                    </div>
                    <!-- Button trigger modal -->
                    <button type="button" @click="submidSend()"
                        class="bg-white cursor-pointer leading-[1.5] text-center select-none py-[0.375rem] px-[1rem] text-[1rem] rounded-[0.25rem] text-red-500 border-red-500 border border-solid px-3 hover:bg-red-500 hover:text-white">Gửi</button>
                </div>
            </form>
            <!-- modal gửi -->
            <div :class="showModalSend ? 'block' : 'hidden'" class="fixed z-100 inset-0 bg-[rgba(0,0,0,0.5)]">
                <div class="p-[8px]">
                    <div class="w-full max-w-[800px] mx-auto bg-white mt-[1.75rem] rounded-[12px]">
                        <header
                            class="p-[1rem] flex items-center justify-between border-b-[1px] border-solid border-[#e0e0e0]">
                            <h5 class="text-[1.25rem] font-medium">Đăng nhập để tham gia bình luận</h5>
                            <button class="bg-white" @click="showModalSend = !showModalSend">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </header>
                        <div class="p-[1rem]">
                            <div class="flex items-center justify-center gap-[12px] flex-wrap">
                                <a class="cursor-pointer btn-default bg-[#3b5998] text-white min-w-[230px] inline-block font-normal leading-[1.5] text-center select-none border border-solid border-transparent py-[0.375rem] px-[0.75rem] text-[1rem] rounded-[0.25rem] hover:text-white hover:opacity-80"
                                    href="#"><i class="fab fa-facebook-f"></i> Đăng nhập qua Facebook</a>
                                <a class="cursor-pointer btn-default bg-[#f44335] text-white min-w-[230px] inline-block font-normal leading-[1.5] text-center select-none border border-solid border-transparent py-[0.375rem] px-[0.75rem] text-[1rem] rounded-[0.25rem] hover:text-white hover:opacity-80"
                                    href="#"><i class="fab fa-google"></i> Đăng nhập qua Google</a>
                            </div>
                            <p class="text-center text-gray-700 my-2">Hoặc</p>
                            <div class="flex items-center justify-center gap-[12px] flex-wrap">
                                <a href="#"
                                    class="border-[#212121] px-[1.5rem] inline-block font-normal leading-[1.5] text-center select-none border border-solid py-[0.375rem]  text-[1rem] rounded-[0.25rem] hover:text-white hover:bg-[#212121] hover:border-[#212121]"
                                    data-bs-toggle="modal" data-bs-target="#loginstep2a" data-bs-dismiss="modal"
                                    aria-label="Close">Đăng
                                    nhập</a>
                                <a href="#"
                                    class="btn text-white bg-red-500 border-red-500 px-[1.5rem] inline-block font-normal leading-[1.5] text-center select-none border border-solid border-transparent py-[0.375rem]  text-[1rem] rounded-[0.25rem] hover:text-white hover:bg-[#d90014] hover:border-[#cc0013]"
                                    data-bs-toggle="modal" data-bs-target="#loginstep2b" data-bs-dismiss="modal"
                                    aria-label="Close">Tạo tài
                                    khoản</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ul class="pl-0 list-none [&_li:not(:first-child)]:pt-[1rem] [&_li:first-child]:!border-none">
            <li class="mb-[1rem] border-t-[1px] border-[#e0e0e0] border-solid">
                <div class="font-bold mb-[0.5rem] flex items-center">
                    <span
                        class="mr-[0.25rem] leading-[40px] w-[40px] h-[40px] text-[1.25rem] overflow-hidden text-red-500 text-center rounded-full bg-[#ededed] transition-[background] duration-[250ms] ease-in-out">
                        <img src="http://picsum.photos/1024/600?random=1" alt="" class="img-fluid">
                    </span>
                    Tuan Nguyen<time class="text-[0.8em] opacity-80 ml-[1rem] font-normal" datetime="2011-01-12">January
                        12th, 2011</time>
                    <span class="text-red-500 cursor-auto font-normal ml-[1rem] flex items-center">
                        <small class="mr-[0.25rem] text-[80%]">2</small>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                    </span>
                    <div @click="showFormComment = !showFormComment"
                        class="font-normal ml-[0.75rem] text-[0.8em] text-red-500 hover:underline">Trả
                        lời</div>
                </div>
                <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, corporis,
                    beatae. Mollitia.</div>
                <div :class="showFormComment ? 'block' : 'hidden'" class="mt-[1rem]">
                    <textarea class="w-full p-[0.75rem] border border-solid border-[#bdbdbd ] rounded-[0.25rem]" rows="2"
                        placeholder="Your comment"></textarea>
                    <div class="flex justify-end items-center">
                        <div class="mr-[0.75rem] flex items-center">
                            <img src="http://picsum.photos/1024/600?random=1" alt=""
                                class="w-[32px] h-[32px] mr-[0.25rem] rounded-full"><span
                                class="text-[0.75rem]">Barry Allen</span>
                        </div>
                        <!-- Button trigger modal -->
                        <a href="#"
                            class="cursor-pointer leading-[1.5] text-center select-none py-[0.375rem] px-[0.75rem] text-[1rem] rounded-[0.25rem] text-red-500 border-red-500 border border-solid px-3 hover:bg-red-500 hover:text-white">Gửi</a>
                    </div>
                </div>
                <div :class="!showCommentListing ? 'block' : 'hidden'" @click="showCommentListing = true"
                    class="mt-[0.5rem] text-[0.875rem]">
                    <div class="flex items-center gap-[4px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-[18px] h-[18px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                        </svg>
                        <span>2</span>
                        trả lời
                    </div>
                </div>

                <ul :class="!showCommentListing ? 'hidden' : 'block'"
                    class="border-t-[1px] border-solid border-[#e0e0e0] pt-[1rem] ml-[1.5rem] pl-0 list-none mt-[1rem]">
                    <li class="mb-[1rem] border-t-[1px] border-[#e0e0e0] border-solid">
                        <div class="font-bold mb-[0.5rem] flex items-center">
                            <span
                                class="mr-[0.25rem] leading-[40px] w-[40px] h-[40px] text-[1.25rem] overflow-hidden text-red-500 text-center rounded-full bg-[#ededed] transition-[background] duration-[250ms] ease-in-out">
                                <img src="http://picsum.photos/1024/600?random=1" alt="" class="img-fluid">
                            </span>
                            Tuan Nguyen<time class="text-[0.8em] opacity-80 ml-[1rem] font-normal"
                                datetime="2011-01-12">January 12th, 2011</time>
                            <span class="text-red-500 cursor-auto font-normal ml-[1rem] flex items-center">
                                <small class="mr-[0.25rem] text-[80%]">2</small>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                            </span>
                            <a href="#" class="font-normal ml-[0.75rem] text-[0.8em] text-red-500 hover:underline">Trả
                                lời</a>
                        </div>
                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus,
                            corporis,
                            beatae. Mollitia.</div>
                    </li>
                </ul>
            </li>
            <li class="mb-[1rem] border-t-[1px] border-[#e0e0e0] border-solid">
                <div class="font-bold mb-[0.5rem] flex items-center">
                    <span
                        class="mr-[0.25rem] leading-[40px] w-[40px] h-[40px] text-[1.25rem] overflow-hidden text-red-500 text-center rounded-full bg-[#ededed] transition-[background] duration-[250ms] ease-in-out">
                        <img src="http://picsum.photos/1024/600?random=1" alt="" class="img-fluid">
                    </span>
                    Tuan Nguyen<time class="text-[0.8em] opacity-80 ml-[1rem] font-normal" datetime="2011-01-12">January
                        12th, 2011</time>
                    <span class="text-red-500 cursor-auto font-normal ml-[1rem] flex items-center">
                        <small class="mr-[0.25rem] text-[80%]">2</small>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                    </span>
                    <a href="#" class="font-normal ml-[0.75rem] text-[0.8em] text-red-500 hover:underline">Trả
                        lời</a>
                </div>
                <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, corporis,
                    beatae. Mollitia.</div>
            </li>
            
        </ul>
    </section>
</template>