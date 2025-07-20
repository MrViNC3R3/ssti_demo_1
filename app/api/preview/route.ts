export async function POST(req: Request) {
  const { description } = await req.json();

  // Safely type both parameters for the replacement function
  const processed = description.replace(
    /{{\s*([^}]*)\s*}}/g, 
    (_: string, code: string) => `\${${code}}`
  );

  try {
    const render = new Function(`return \`${processed}\`;`);
    const result = render();
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ result: "Error: " + e.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
