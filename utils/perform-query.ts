import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

export function performQuery(key: string, value: any): void {
  const query = { ...route.query };
  query[key] = value;

  if (key) router.push({ query });
  else {
    delete query[key];
    router.push({ query });
  }
}
