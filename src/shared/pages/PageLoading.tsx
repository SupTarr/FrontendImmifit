import { Loading, Size } from "../components/ui/Loading.tsx";

const PageLoading = () => {
  return (
    <section className="page-loading flex min-h-screen flex-col flex-wrap content-center justify-center">
      <Loading size={Size.Large} />
    </section>
  );
};

export default PageLoading;
