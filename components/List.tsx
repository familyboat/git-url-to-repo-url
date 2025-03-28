import { type RepoUrl } from "../islands/forms/GitUrlToRepoUrl.tsx";
import { useSignal } from "@preact/signals";
import { throttle } from "@std/async/unstable-throttle";

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

  async function handleClick() {
    if (buttonStatus.value !== "normal") return;

    try {
      await navigator.clipboard.writeText(url);
      buttonStatus.value = "success";
    } catch (_e) {
      buttonStatus.value = "error";
    } finally {
      setTimeout(() => {
        buttonStatus.value = "normal";
      }, 1500);
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
        class="bg-green-500 text-white rounded-md p-2 m-2 hover:bg-green-700 transition-all"
        onClick={throttle(handleClick, 1800)}
        disabled={buttonStatus.value !== "normal"}
      >
        {getButtonText()}
      </button>
    </li>
  );
}
