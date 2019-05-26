const hexColor = (r, g, b, a) => {
  const rS = r.toString(16).padStart(2, '0');
  const gS = g.toString(16).padStart(2, '0');
  const bS = b.toString(16).padStart(2, '0');
  const aS = a.toString(16).padStart(2, '0');
  return `#${rS}${gS}${bS}${aS}`
}

export default hexColor;