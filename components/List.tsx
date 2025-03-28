import { type RepoUrl } from "../islands/forms/GitUrlToRepoUrl.tsx";
import { useSignal } from "@preact/signals";

export default function List({ type, url }: RepoUrl) {
  const buttonStatus = useSignal<"normal" | "success" | "error">("normal");

  function getButtonText() {
    switch (buttonStatus.value) {
      case "normal":
        return "copy";
      case "error":
        return "fail";
      case "success":
        return "success";
    }
  }

  return (
    <li
      key={type}
      class="flex items-center justify-between border-2 border-gray-300 rounded-md p-2 m-2"
    >
      <span>
        {type}:
      </span>
      <span>
        {url}
      </span>
      <button
        type="button"
        class="bg-green-500 text-white rounded-md p-2 m-2 hover:bg-green-700"
        onClick={async () => {
          if (buttonStatus.value !== "normal") return;

          try {
            await navigator.clipboard.writeText(url);
            buttonStatus.value = "success";
          } catch (_e) {
            buttonStatus.value = "error";
          } finally {
            setTimeout(() => {
              buttonStatus.value = "normal";
            }, 600);
          }
        }}
        disabled={buttonStatus.value !== "normal"}
      >
        {getButtonText()}
      </button>
    </li>
  );
}
