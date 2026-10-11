export function DevMark() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="dev-sfs" aria-hidden>
      SFS
    </div>
  );
}
