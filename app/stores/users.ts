export const useUserStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const initUsers = () => {
    try {
    } catch (e) {console.log(e)}
    const localUsers: string | null = localStorage.getItem("users");
    if (localUsers) {
      users.value = JSON.parse(localUsers);
      return;
    }
  };

  const isLoadedUsers = () => {};

  return {
    users,
    loading,
    error,

    initUsers,
    isLoadedUsers,
  };
});
