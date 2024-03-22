<script setup lang="ts">
const props = defineProps<{ id: string }>();
// type = 1 single choice, type = 2 multiple choice
const quizzes = ref<any>(null);
const canShowResults = ref(false);
const showResult = ref(false);
const questionIndex = ref(0);
const isAnswered = computed(() =>
  Array.isArray(selectedAnswers.value)
    ? selectedAnswers.value.length === questions.value.length
    : selectedAnswers.value !== null
);
const selectedAnswers = ref<any[]>([]);
const questions = ref<any[]>([]);

const fetchById = async (id: string) => {
  try {
    const response = await $fetch(
      useRuntimeConfig().public.apiUrl + `/cms/quiz/${id}`
    );
    if (response) {
      quizzes.value = (response as any).item;
      questions.value = quizzes.value.questions;
    }
  } catch (err) {
    console.log(err);
  }
};

const submitQuizzes = async () => {
  try {
    if (!isAnswered.value) return;

    const response = await $fetch(
      useRuntimeConfig().public.apiUrl + "/cms/quiz-user-answer",
      {
        method: "POST",
        headers: {},
        body: selectedAnswers.value,
      }
    );

    if (response) {
      canShowResults.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

const isCurrentQuestionAnswered = computed(() => {
  return selectedAnswers.value.length === questionIndex.value + 1;
});

const handleNext = async () => {
  if (!isCurrentQuestionAnswered.value) {
    alert("Bạn chưa chọn câu trả lời");
    return;
  }

  questionIndex.value += 1;

  if (questionIndex.value === questions.value.length) {
    showResult.value = true;
    await submitQuizzes();
  }
};

const handleAnswer = (answer: any) => {
  const { questionId } = answer;
  if (selectedAnswers.value.find((ans: any) => ans.questionId === questionId)) {
    selectedAnswers.value = selectedAnswers.value.filter(
      (ans: any) => ans.questionId !== questionId
    );
  }
  selectedAnswers.value.push(answer);
};

function toggleResults() {
  if (canShowResults.value) showResult.value = !showResult.value;
}

onMounted(async () => {
  await fetchById(props.id);
});
</script>
<template>
  <div
    class="flex flex-col px-4 py-2 border-2 border-solid border-sky-700 rounded-lg bg-blue-100"
  >
    <div class="">
      <p v-if="questionIndex < questions.length">
        Câu hỏi số {{ questionIndex + 1 }} trong số {{ questions.length }} câu
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p v-if="questionIndex < questions.length">
        {{ questions[questionIndex].title }}
      </p>
      <p v-else>Quiz completed!</p>
      <button
        class="underline text-blue-400"
        v-show="!showResult && isAnswered && canShowResults"
        @click="toggleResults"
      >
        Kết quả
      </button>
    </div>
    <div v-if="!showResult" class="">
      <ul>
        <li
          v-for="answer in questions[questionIndex]?.answers"
          :key="answer.id"
        >
          <label>
            <input
              type="radio"
              :value="answer.id"
              :name="String(questionIndex)"
              @click="handleAnswer(answer)"
            />
            {{ answer.content }}
          </label>
        </li>
      </ul>

      <div class="mt-3">
        <button
          v-if="questionIndex < questions.length - 1"
          @click="handleNext()"
          class="mt-3 px-2 py-1 border rounded-lg cursor-pointer bg-blue-500 text-white hover:(bg-blue-700 text-white)"
        >
          Tiếp theo
        </button>
        <button
          v-else-if="questionIndex === questions.length - 1"
          :disabled="!isCurrentQuestionAnswered"
          class="mt-3 px-2 py-1 border rounded-lg cursor-pointer bg-blue-500 text-white hover:(bg-blue-700 text-white)"
          @click="handleNext()"
        >
          Xác nhận
        </button>
      </div>
    </div>
    <div v-if="showResult">
      <p>Your results:</p>
      <ul>
        <li v-for="(q, index) in questions" :key="index">
          <div class="py-3">
            <h3>{{ q.title }}</h3>
            <p class="pl-3 !mb-0">
              Câu trả lời:
              {{
                q.answers.find((a: any) =>
                  selectedAnswers.find((s) => s.id === a.id)
                )?.content
              }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
