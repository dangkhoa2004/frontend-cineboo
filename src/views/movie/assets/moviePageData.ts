// moviePageData.ts
import { ref, onMounted, onUnmounted } from "vue";
import { fetchMovies } from "@/api/movie";
import { Movie } from "@/type";

export function useMoviePageData() {
  const movies = ref<Movie[]>([]);
  const isScrollButtonVisible = ref(false);

  const loadMovies = async () => {
    try {
      movies.value = await fetchMovies();
    } catch (error) {
      console.error("Component [Lỗi khi xử lý dữ liệu phim]:", error);
    }
  };

  const toggleScrollButtonVisibility = () => {
    isScrollButtonVisible.value = window.scrollY > 100;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onMounted(() => {
    loadMovies();
    window.addEventListener("scroll", toggleScrollButtonVisibility);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", toggleScrollButtonVisibility);
  });

  return {
    movies,
    isScrollButtonVisible,
    scrollToTop,
  };
}
