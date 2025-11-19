export default defineNuxtRouteMiddleware(() => {
  const id: string | null = localStorage.getItem("id");
  if (id) {
    console.log(id);
  }
});
