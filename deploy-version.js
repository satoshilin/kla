(() => {
  const DEPLOY_VERSION = "__DEPLOY_TIME__";

  const shouldVersionUrl = (value) => {
    if (typeof value !== "string" || !value) return false;
    const trimmed = value.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return false;
    if (/^(https?:)?\/\//i.test(trimmed)) return false;
    return true;
  };

  const withDeployVersion = (value) => {
    if (!shouldVersionUrl(value)) return value;
    try {
      const url = new URL(value, window.location.href);
      if (url.origin !== window.location.origin) return value;
      url.searchParams.set("v", DEPLOY_VERSION);
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return value;
    }
  };

  const versionAttr = (root, selector, attr) => {
    root.querySelectorAll(selector).forEach((node) => {
      const currentValue = node.getAttribute(attr);
      if (!currentValue) return;
      const nextValue = withDeployVersion(currentValue);
      if (nextValue !== currentValue) node.setAttribute(attr, nextValue);
    });
  };

  const refreshVersionedResources = (root = document) => {
    if (!(root instanceof Element || root instanceof Document)) return;
    versionAttr(root, "img[src]", "src");
    versionAttr(root, "source[src]", "src");
    versionAttr(root, "video[src]", "src");
    versionAttr(root, "a[href]", "href");
  };

  window.DEPLOY_VERSION = DEPLOY_VERSION;
  window.withDeployVersion = withDeployVersion;
  window.refreshVersionedResources = refreshVersionedResources;
  document.addEventListener("DOMContentLoaded", () => {
    refreshVersionedResources(document);
  });
})();
