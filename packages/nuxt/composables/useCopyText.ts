export const useCopyText = () => {
  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    // event.preventDefault();
  }

  return copyText;
};
