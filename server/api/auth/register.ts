type RegisterRequest = {
  name: string;
  password: string;
  email: string;
};
export default defineEventHandler(async (event) => {
  try {
    const { site, apiUrl } = useRuntimeConfig().public;
    const body = (await readBody(event)) as RegisterRequest;

    const user = await $fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      body: body,
      headers: {
        'site': site
      }
    });

    console.log("user", user);

    return new Response(JSON.stringify({ message: "User registered" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
});
