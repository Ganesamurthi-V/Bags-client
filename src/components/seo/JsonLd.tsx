/**
 * Renders a JSON-LD `<script>` tag. Server component — the structured data is
 * present in the initial HTML so crawlers and AI answer engines that don't run
 * JavaScript still see it.
 *
 * Pass one schema object or an array; each becomes its own script tag.
 */
type JsonLd = Record<string, unknown>;

export function JsonLd({ schema }: { schema: JsonLd | JsonLd[] }) {
  const items = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {items.map((item, i) => (
        <script
          // Order is stable and content is static, so index keys are safe here.
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
