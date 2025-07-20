export async function POST(req) {
  const { description } = await req.json();

  // Replace all {{ ... }} with ${ ... }
  // This handles spaces between the braces and the JS expression too
  const processed = description.replace(/{{\s*([^}]*)\s*}}/g, (_, code) => `\${${code}}`);

  try {
    const render = new Function(`return \`${processed}\`;`);
    const result = render();
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ result: "Error: " + e.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
