import GitUrlToRepoUrl from "../islands/forms/GitUrlToRepoUrl.tsx";

export default function Home() {
  return (
    <>
      <h2 class="font-serif text-center text-2xl m-2">
        transform your git url to git repo
      </h2>
      <p class="text-red-500 text-center m-2">
        note: this site is for china users, who want to use git in china.
      </p>

      <div class="text-center">
        <GitUrlToRepoUrl />
      </div>
    </>
  );
}
