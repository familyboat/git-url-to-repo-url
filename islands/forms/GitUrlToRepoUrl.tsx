import { useSignal } from "@preact/signals";
import List from "../../components/List.tsx";

export type RepoUrl = {
  type: string;
  url: string;
};

export default function GitUrlToRepoUrl() {
  const gitUrlSignal = useSignal("");
  const repoUrlsSignal = useSignal<{ type: string; url: string }[]>([]);

  function updateRepoUrls(urls: RepoUrl[]) {
    repoUrlsSignal.value = urls;
  }

  function transform() {
    const gitUrl = gitUrlSignal.value;

    if (!gitUrl) {
      updateRepoUrls([]);
      return;
    }

    try {
      const url = new URL(gitUrl);
      const { pathname } = url;
      const parts = pathname.split("/");

      if (parts.length !== 3) {
        updateRepoUrls([]);
        return;
      }

      const user = parts[1];
      const repo = parts[2];

      const ssh = {
        type: "ssh",
        url: `git@${url.host}:${user}/${repo}.git`,
      };

      const https = {
        type: "https",
        url: `https://${url.host}/${user}/${repo}.git`,
      };

      updateRepoUrls([ssh, https]);
      return;
    } catch (_e) {
      alert("There is something wrong, please type again!");
    }
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    gitUrlSignal.value = target.value;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="git url"
          value={gitUrlSignal.value}
          onInput={handleInput}
          class="border-2 border-gray-300 rounded-md p-2 m-2"
          aria-label="git url"
        />
        <button
          type="submit"
          onClick={transform}
          class="bg-blue-500 text-white rounded-md p-2 m-2 hover:bg-blue-700"
        >
          transform
        </button>
      </form>
      <output>
        <ul>
          {repoUrlsSignal.value.map((repoUrl) => {
            const { type, url } = repoUrl;
            return (
              <List
                type={type}
                url={url}
              />
            );
          })}
        </ul>
      </output>
    </>
  );
}
