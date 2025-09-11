import { lazy, Suspense, useMemo } from "react";

function getIcon(name: string) {
  return lazy(() =>
    import("@mui/icons-material").then((mod: any) => ({ default: mod[name] }))
  );
}

export function DynamicIcon({ name }: { name?: string }) {
  if (!name) return null;
  const IconComp = useMemo(() => getIcon(name), [name]);
  return (
    <Suspense fallback={null}>
      <IconComp />
    </Suspense>
  );
}
