export const scrollToElementByDataTest = (dataTestValue: string) => {
  const element = document.querySelector(`[data-test="${dataTestValue}"]`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    console.error(`Element with data-test="${dataTestValue}" not found.`);
  }
};
