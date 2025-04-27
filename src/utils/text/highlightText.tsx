export const highlightText = (text: string, searchQuery?: string) => {
  if (!searchQuery || !text) return text;
  const keywords = searchQuery.toLowerCase().split(" ").filter(Boolean);
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");

  return (
    <>
      {text.split(regex).map((part, index) =>
        keywords.includes(part.toLowerCase()) ? (
          <span key={index} className="bg-yellow-200 text-yellow-900 font-semibold px-1 rounded">
            {part}
            </span>
        ) : (
          part
        )
      )}
    </>
  );
};