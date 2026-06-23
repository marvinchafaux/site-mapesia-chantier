/**
 * Injecte un bloc JSON-LD Schema.org.
 * Le contenu vient de nos générateurs typés (lib/jsonld.ts), pas d'une entrée
 * utilisateur. Par défense en profondeur, on échappe `<` et les séparateurs de
 * ligne Unicode U+2028 / U+2029 pour empêcher toute évasion `</script>` ou
 * rupture du bloc si une donnée venait à en contenir.
 */

const LINE_SEP = String.fromCharCode(0x2028);
const PARA_SEP = String.fromCharCode(0x2029);

export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .split(LINE_SEP)
    .join("\\u2028")
    .split(PARA_SEP)
    .join("\\u2029");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
