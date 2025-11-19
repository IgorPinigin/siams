export const useUserStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const initUsers = () => {
    // Ту должен быть сетевой запрос поэтому trycatch
    try {
      loading.value = true;
      const localUsers: string | null = localStorage.getItem("users");
      if (localUsers) {
        users.value = JSON.parse(localUsers);
        return;
      } else {
        users.value = [
          {
            id: "1",
            fullName: "Иванов Иван Иванович",
            dateOfBirth: "1990-05-15",
            email: "ivanov@example.com",
            phone: "+7-999-123-45-67",
          },
          {
            id: "2",
            fullName: "Петрова Анна Сергеевна",
            dateOfBirth: "1985-12-03",
            email: "petrova@example.com",
            phone: "+7-999-234-56-78",
          },
          {
            id: "3",
            fullName: "Сидоров Алексей Петрович",
            dateOfBirth: "1995-07-22",
            email: "sidorov@example.com",
            phone: "+7-999-345-67-89",
          },
        ];
        localStorage.setItem("users", JSON.stringify(users.value));
      }
      setTimeout(() => {
        loading.value = false;
      }, 500);
    } catch (e) {
      error.value = (e as Error).message;
      loading.value = false;
    }
  };

  const createUser = (user: User) => {
    try {
      loading.value = true;
      setTimeout(() => {
        users.value.unshift(user);
        loading.value = false;
      }, 500);
    } catch (e) {
      loading.value = false;
      error.value = (e as Error).message;
    }
  };

  const deleteUser = (id: string) => {
    try {
      loading.value = true;
      setTimeout(() => {
        users.value = users.value.filter((user) => user.id !== id);
        localStorage.setItem("users", JSON.stringify(users.value));
        loading.value = false;
      }, 200);
    } catch (e) {
      loading.value = false;
      error.value = (e as Error).message;
    }
  };

  const updateUser = (id: string, userData: User) => {
    const index = users.value.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.value[index] = userData;
    }
  };



  return {
    users,
    loading,
    error,

    initUsers,
    createUser,
    deleteUser,
    updateUser
  };
});
