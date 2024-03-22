<script setup lang="ts">
import { util } from 'zod';
import type { Poll, PollOption } from '~/server/models/v2/poll';

const props = defineProps<{ dataId?: string }>();

const poll = ref<Poll | null>(null);
const options = ref<PollOption[]>([]);

const alreadyVoted = ref(false);
const selectedOption = ref<any>(null);
const showResult = ref(false);
const allowAnonymous = ref(false);
const totalVotes = ref(0);

const canShowResult = computed(() => {
  switch (poll.value?.resultPublication) {
    case 0:
      return false;
    case 1:
      return true;
    case 2:
      return alreadyVoted.value;
    case 3:
      return alreadyVoted.value || poll.value?.endTime;
    default:
      return false;
  }
})

const { data, error } = await useLazyAsyncData('poll-with-options', async () => {
  const [poll, pollOptions] = await Promise.all([
    $fetch(`/api/v2/poll/${props.dataId}`),
    $fetch(`/api/v2/poll-option/poll/${props.dataId}`),
  ]);

  return { poll, pollOptions };
})

if (error.value) utils.log('fetch-poll', error.value);

if (data.value) {
  poll.value = data.value?.poll?.item
  options.value = data.value?.pollOptions?.items

  allowAnonymous.value = poll.value?.participant !== 2;
  totalVotes.value = options.value.reduce((acc, cur: PollOption) => acc + cur.voteCount, 0);
  utils.log('totalVotes', totalVotes.value);
}

const submitVote = async () => {
  if (!selectedOption.value) return;

  const result = await $fetch('/api/v2/poll-vote', {
    method: 'POST',
    body: {pollOptionId:selectedOption.value.id},
  });

  if(result)
    alreadyVoted.value = true;

};

function toggleResults() {
  if (canShowResult.value) showResult.value = !showResult.value;
}

function calculatePercentage(amount: number) {
  if (totalVotes.value === 0) return 0;
  return (amount / totalVotes.value) * 100;
}
</script>

<template>
  <span class="inline-block px-4 py-2 shadow-xl rounded-lg bg-[#f5f5f5]">
    <span class="block">
      <span class="underline decoration-gray-500 font-bold">
        {{ poll?.title }}
      </span>
      <button v-if="showResult && canShowResult" type="button" class="underline text-blue-400" @click="toggleResults">
        Câu hỏi
      </button>
      <button class="underline text-blue-400" v-if="!showResult && canShowResult" type="button" @click="toggleResults">
        Kết quả
      </button>
    </span>

    <span v-if="!showResult" class="p-1 block">
          <span v-for="(answer, index) in options" :key="index" class="block">
            <label class="flex gap-2 m-2">
              <input :type="'radio'" :value="answer" v-model="selectedOption" />
              <span class="font-semibold">{{ answer.title }}</span>
            </label>
          </span>
        <Button @click="submitVote" label="Bình chọn" />
    </span>

    <span v-else class="block">
        <span v-for="(answer, index) in options" :key="index" class="block poll-result relative rounded-3xl overflow-hidden my-3">
          <span class="absolute top-0 start-0 bottom-0 bg-gradient-to-r from-sky-500 to-indigo-500"
            :style="{ width: `${calculatePercentage(answer.voteCount)}%` }"></span>
          <span class="block relative z-0 ps-1">
            <span>{{ calculatePercentage(answer.voteCount).toFixed(2) }}%</span>
            <span class="">({{ answer.voteCount }})</span>
          </span>
        </span>
    </span>
  </span>
</template>
<style scoped>
.poll-result::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(226, 215, 215);
}
</style>
