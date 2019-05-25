const hexColor = (r, g, b, a) => {
  const rS = r.toString(16);
  const gS = g.toString(16);
  const bS = b.toString(16);
  const aS = a.toString(16);
  return `${rS}${gS}${bS}${aS}`
}